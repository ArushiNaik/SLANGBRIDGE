package com.slangbridge.backend.model;

import jakarta.persistence.*;
import lombok.Generated;

@Entity
public class Slang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String term;

    @Column(nullable = false, length = 500)
    private String definition;

    @Column(nullable = false, length = 500)
    private String example;

    @Column(nullable = true, length = 100)
    private String category;

    @Generated
    public Slang() {
    }

    @Generated
    public Slang(Long id, String term, String definition, String example, String category) {
        this.id = id;
        this.term = term;
        this.definition = definition;
        this.example = example;
        this.category = category;
    }

    @Generated
    public Slang(Long id, String term, String definition, String example) {
        this(id, term, definition, example, null);
    }

    @Generated
    public Long getId() { return id; }

    @Generated
    public String getTerm() { return term; }

    @Generated
    public String getDefinition() { return definition; }

    @Generated
    public String getExample() { return example; }

    @Generated
    public String getCategory() { return category; }

    @Generated
    public void setId(Long id) { this.id = id; }

    @Generated
    public void setTerm(String term) { this.term = term; }

    @Generated
    public void setDefinition(String definition) { this.definition = definition; }

    @Generated
    public void setExample(String example) { this.example = example; }

    @Generated
    public void setCategory(String category) { this.category = category; }

    @Generated
    public static SlangBuilder builder() { return new SlangBuilder(); }

    @Generated
    public static class SlangBuilder {
        private Long id;
        private String term;
        private String definition;
        private String example;
        private String category;

        SlangBuilder() {}

        public SlangBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public SlangBuilder term(String term) {
            this.term = term;
            return this;
        }

        public SlangBuilder definition(String definition) {
            this.definition = definition;
            return this;
        }

        public SlangBuilder example(String example) {
            this.example = example;
            return this;
        }

        public SlangBuilder category(String category) {
            this.category = category;
            return this;
        }

        public Slang build() {
            return new Slang(id, term, definition, example, category);
        }

        public String toString() {
            return "Slang.SlangBuilder(id=" + id + ", term=" + term + ", definition=" + definition + ", example=" + example + ", category=" + category + ")";
        }
    }
}
