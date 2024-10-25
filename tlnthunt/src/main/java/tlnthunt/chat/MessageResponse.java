package tlnthunt.chat;

public record MessageResponse(
        String sender,
        String receiver,
        String content
) {
}
