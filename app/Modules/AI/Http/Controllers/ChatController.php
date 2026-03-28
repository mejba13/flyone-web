<?php

namespace App\Modules\AI\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\AI\Models\ChatConversation;
use App\Modules\AI\Services\ChatService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ChatController extends Controller
{
    public function __construct(private ChatService $chatService) {}

    public function index(Request $request)
    {
        $conversations = ChatConversation::where('user_id', $request->user()->id)
            ->with('latestMessage')
            ->orderByDesc('updated_at')
            ->limit(20)
            ->get();

        return Inertia::render('Chat/Index', [
            'conversations' => $conversations,
        ]);
    }

    public function show(Request $request, ChatConversation $conversation)
    {
        $conversation->load('messages');

        return Inertia::render('Chat/Show', [
            'conversation' => $conversation,
        ]);
    }

    public function store(Request $request)
    {
        $conversation = $this->chatService->createConversation($request->user());

        return redirect()->route('chat.show', $conversation);
    }

    public function sendMessage(Request $request, ChatConversation $conversation)
    {
        $request->validate(['message' => 'required|string|max:2000']);

        return new StreamedResponse(function () use ($conversation, $request) {
            header('Content-Type: text/event-stream');
            header('Cache-Control: no-cache');
            header('Connection: keep-alive');

            foreach ($this->chatService->sendMessage($conversation, $request->message) as $chunk) {
                echo "data: " . json_encode(['text' => $chunk]) . "\n\n";
                if (ob_get_level() > 0) {
                    ob_flush();
                }
                flush();
            }

            echo "data: [DONE]\n\n";
            if (ob_get_level() > 0) {
                ob_flush();
            }
            flush();
        }, 200, [
            'Content-Type' => 'text/event-stream',
            'Cache-Control' => 'no-cache',
            'X-Accel-Buffering' => 'no',
        ]);
    }

    public function destroy(ChatConversation $conversation)
    {
        $conversation->delete();
        return redirect()->route('chat.index')->with('success', 'Conversation deleted.');
    }
}
