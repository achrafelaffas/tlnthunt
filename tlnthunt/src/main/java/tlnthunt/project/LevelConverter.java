package tlnthunt.project;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import static tlnthunt.project.Level.*;

@Converter(autoApply = true)
public class LevelConverter implements AttributeConverter<Level, String> {

    @Override
    public String convertToDatabaseColumn(Level level) {
        if (level == null) throw new NullPointerException("level is null");

        return switch (level) {
            case BEGINNER -> BEGINNER.getLevel();
            case INTERMEDIATE -> INTERMEDIATE.getLevel();
            case EXPERT -> EXPERT.getLevel();
        };
    }

    @Override
    public Level convertToEntityAttribute(String s) {
        if (s == null) throw new NullPointerException("level is null");

        return switch (s) {
            case "beginner" -> BEGINNER;
            case "intermediate" -> INTERMEDIATE;
            case "expert" -> EXPERT;
            default -> null;
        };
    }
}
