package tlnthunt.chat;

import org.springframework.stereotype.Service;

@Service
public class MessageMapper {

    public Message toMessage(MessageRequest request) {
        return Message.builder().content(request.content()).build();
    }
}
