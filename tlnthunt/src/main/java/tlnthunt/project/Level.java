package tlnthunt.project;

import lombok.Getter;

@Getter
public enum Level {
    BEGINNER("beginner"), INTERMEDIATE("intermediate"), EXPERT("expert");

    private final String level;

    Level(String level) {
        this.level = level;
    }
}
