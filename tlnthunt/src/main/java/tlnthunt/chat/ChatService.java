package tlnthunt.chat;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import tlnthunt.common.BaseEntity;
import tlnthunt.user.User;
import tlnthunt.user.UserRepository;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final MessageRepository messageRepository;
    public final MessageMapper messageMapper;
    private final UserRepository userRepository;

    public void send(MessageRequest request, Authentication auth) {
        User user = (User) auth.getPrincipal();
        String sender = user.getUsername();
        Message message = messageMapper.toMessage(request);
        message.setSender(sender);
        User receiver = userRepository.findById(request.receiver()).orElseThrow();
        message.setReceiver(receiver.getUsername());
        messageRepository.save(message);
    }

    public List<Message> getChatHistory(Authentication auth, @PathVariable String otherUser) {
        String currentUser = auth.getName();
        List<Message> messages = messageRepository.findBySenderAndReceiverOrderByCreatedDate(currentUser, otherUser);
        messages.addAll(messageRepository.findByReceiverAndSenderOrderByCreatedDate(currentUser, otherUser));
        messages.sort(Comparator.comparing(BaseEntity::getCreatedDate));
        return messages;
    }
}
