package com.slangbridge.backend.controller;

import com.slangbridge.backend.dto.QuizQuestion;
import com.slangbridge.backend.dto.QuizSession;
import com.slangbridge.backend.dto.QuizAnswerRequest;
import com.slangbridge.backend.dto.QuizAnswerResponse;
import com.slangbridge.backend.service.SlangQuizService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "*")
public class QuizController {

    private final SlangQuizService quizService;

    public QuizController(SlangQuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("/multiple-choice")
    public QuizQuestion getSingleQuestion() {
        return quizService.generateQuestion();
    }

    @GetMapping("/session")
    public QuizSession getQuizSession(@RequestParam int size) {
        return quizService.generateQuizSession(size);
    }

    @PostMapping("/check")
    public QuizAnswerResponse checkAnswer(@RequestBody QuizAnswerRequest req) {
        return quizService.checkAnswer(req);
    }
}
