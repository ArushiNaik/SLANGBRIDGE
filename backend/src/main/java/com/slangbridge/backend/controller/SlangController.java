package com.slangbridge.backend.controller;

import com.slangbridge.backend.dto.QuizAnswerRequest;
import com.slangbridge.backend.dto.QuizAnswerResponse;
import com.slangbridge.backend.dto.QuizSession;
import com.slangbridge.backend.model.Slang;
import com.slangbridge.backend.repository.SlangRepository;
import java.util.List;

import com.slangbridge.backend.service.SlangQuizService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/slangs")
@CrossOrigin(origins = "*")
public class SlangController {
    private final SlangRepository repo;
    private final SlangQuizService quizService;

    public SlangController(SlangRepository repo, SlangQuizService quizService) {
        this.repo = repo;
        this.quizService = quizService;
    }

    @GetMapping
    public List<Slang> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{term}")
    public ResponseEntity<?> getByTerm(@PathVariable String term) {
        return repo.findByTermIgnoreCase(term)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Autocomplete endpoint
    @GetMapping("/autocomplete")
    public List<String> autocomplete(@RequestParam String prefix) {
        return repo.findTop10ByTermStartingWithIgnoreCase(prefix)
                .stream()
                .map(Slang::getTerm)
                .toList();
    }
    @PostMapping("/quiz/answer")
    public QuizAnswerResponse checkQuizAnswer(@RequestBody QuizAnswerRequest req){
        return  quizService.checkAnswer(req);
    }

    @GetMapping("/quiz/session")
    public QuizSession getQuizSession(@RequestParam(defaultValue = "10") int size) {
        return quizService.generateQuizSession(size);
    }

    @GetMapping("/all")
    public List<Slang> getAllSlang() {
        return repo.findAll();
    }



}
