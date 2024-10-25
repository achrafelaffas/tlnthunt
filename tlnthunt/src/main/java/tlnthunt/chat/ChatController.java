package tlnthunt.chat;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("chat")
@RequiredArgsConstructor
@Tag(name = "Chat")
public class ChatController {
    private final ChatService chatService;

    @PostMapping("/send")
    public ResponseEntity<Void> send(@RequestBody MessageRequest request, Authentication auth) {
        chatService.send(request, auth);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/history/{otherUser}")
    public ResponseEntity<List<Message>> getHistory(@PathVariable String otherUser, Authentication auth) {
        return ResponseEntity.ok(chatService.getChatHistory(auth, otherUser));
    }
}
