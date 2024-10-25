package tlnthunt.chat;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderAndReceiverOrderByCreatedDate(String sender, String receiver);
    List<Message> findByReceiverAndSenderOrderByCreatedDate(String receiver, String sender);
}
