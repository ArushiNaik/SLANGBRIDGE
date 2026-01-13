package com.slangbridge.backend.repository;

import com.slangbridge.backend.model.Slang;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SlangRepository extends JpaRepository<Slang, Long> {
    Optional<Slang> findByTermIgnoreCase(String term);

    // New method for autocomplete
    List<Slang> findTop10ByTermStartingWithIgnoreCase(String prefix);
}

