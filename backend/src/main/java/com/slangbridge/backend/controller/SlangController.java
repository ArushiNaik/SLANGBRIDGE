package com.slangbridge.backend.controller;

import com.slangbridge.backend.model.Slang;
import com.slangbridge.backend.repository.SlangRepository;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/slangs")
@CrossOrigin(origins = "*")
public class SlangController {

    private final SlangRepository repo;

    public SlangController(SlangRepository repo) {
        this.repo = repo;
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
}
