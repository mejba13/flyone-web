<?php

namespace App\Modules\AI\Services;

use App\Modules\AI\Models\ChatConversation;
use App\Modules\AI\Models\ChatMessage;
use App\Modules\User\Models\User;
use Illuminate\Support\Facades\Http;

class ChatService
{
    private string $apiKey;
    private string $model = 'claude-sonnet-4-20250514';

    public function __construct()
    {
        $this->apiKey = config('services.anthropic.api_key', '');
    }

    public function createConversation(User $user, string $title = ''): ChatConversation
    {
        return ChatConversation::create([
            'user_id' => $user->id,
            'title' => $title ?: 'New Conversation',
        ]);
    }

    public function sendMessage(ChatConversation $conversation, string $message): \Generator
    {
        ChatMessage::create([
            'conversation_id' => $conversation->id,
            'role' => 'user',
            'content' => $message,
        ]);

        $messages = $conversation->messages()
            ->orderBy('created_at')
            ->get()
            ->map(fn ($m) => ['role' => $m->role, 'content' => $m->content])
            ->toArray();

        $systemPrompt = $this->getSystemPrompt();

        $response = Http::withHeaders([
            'x-api-key' => $this->apiKey,
            'anthropic-version' => '2023-06-01',
            'content-type' => 'application/json',
        ])->withOptions(['stream' => true])
          ->post('https://api.anthropic.com/v1/messages', [
              'model' => $this->model,
              'max_tokens' => 1024,
              'system' => $systemPrompt,
              'messages' => $messages,
              'stream' => true,
          ]);

        $fullContent = '';

        foreach (explode("\n", $response->body()) as $line) {
            if (str_starts_with($line, 'data: ')) {
                $data = json_decode(substr($line, 6), true);
                if ($data && isset($data['type'])) {
                    if ($data['type'] === 'content_block_delta' && isset($data['delta']['text'])) {
                        $fullContent .= $data['delta']['text'];
                        yield $data['delta']['text'];
                    }
                }
            }
        }

        ChatMessage::create([
            'conversation_id' => $conversation->id,
            'role' => 'assistant',
            'content' => $fullContent,
        ]);

        if (!$conversation->title || $conversation->title === 'New Conversation') {
            $conversation->update(['title' => \Illuminate\Support\Str::limit($message, 50)]);
        }
    }

    private function getSystemPrompt(): string
    {
        return <<<PROMPT
You are Flyone AI, a friendly and knowledgeable travel assistant for the Flyone travel booking platform. You help users with:

1. Finding the best travel routes and deals
2. Answering questions about destinations, weather, visas, and travel tips
3. Helping with booking modifications, cancellations, and refunds
4. Providing information about loyalty points and promotions
5. General travel advice and recommendations

Be conversational, helpful, and concise. When suggesting routes or destinations, be specific about prices, times, and options when possible. Always maintain a friendly, enthusiastic tone about travel.
PROMPT;
    }
}
