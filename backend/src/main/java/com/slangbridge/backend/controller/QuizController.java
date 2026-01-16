package com.slangbridge.backend.controller;

import com.slangbridge.backend.dto.QuizQuestion;
import com.slangbridge.backend.dto.QuizSession;
import com.slangbridge.backend.dto.QuizAnswerRequest;
import com.slangbridge.backend.dto.QuizAnswerResponse;
import com.slangbridge.backend.model.Slang;
import com.slangbridge.backend.repository.SlangRepository;
import com.slangbridge.backend.service.SlangQuizService;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "*")
public class QuizController {

    private final SlangQuizService quizService;
    private final SlangRepository repo;

    public QuizController(SlangQuizService quizService, SlangRepository repo) {
        this.quizService = quizService;
        this.repo = repo;
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

    @GetMapping("/matching")
    public QuizSession generateMatchingQuiz(@RequestParam int size) {
        List<Slang> all = repo.findAll();
        if (all.size() < size) {
            throw new RuntimeException("Not enough entries in DB");
        }

        Collections.shuffle(all);

        List<Slang> quizList = all.stream()
                .limit(size)
                .toList();

        List<QuizQuestion> questions = quizList.stream()
                .map(s -> new QuizQuestion(
                        s.getTerm(),
                        s.getDefinition(),
                        Collections.emptyList()
                ))
                .toList();

        return new QuizSession(questions, size);
    }

}
