package tlnthunt.common;

import lombok.Getter;

@Getter
public enum Period {
    LESS_THAN_A_MONTH("less than a month"),
    ONE_MONTH("one month"),
    MORE_THAN_THREE_MONTHS("more than three months"),
    ;

    private final String time;

    Period(String time) {
        this.time = time;
    }
}
