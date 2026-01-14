package com.slangbridge.backend.dto;

import java.util.List;

public record QuizSession(
        List<QuizQuestion> questions,
        int total
) {}

