package tlnthunt.chat;

public record MessageRequest(
        String content,
        Long receiver
) {
}
