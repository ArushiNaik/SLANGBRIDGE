package com.slangbridge.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Generated;

@Entity
public class Slang {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long id;
    @Column(
            nullable = false,
            unique = true
    )
    private String term;
    @Column(
            nullable = false,
            length = 500
    )
    private String definition;
    @Column(
            nullable = false,
            length = 500
    )
    private String example;

    @Generated
    public static SlangBuilder builder() {
        return new SlangBuilder();
    }

    @Generated
    public Long getId() {
        return this.id;
    }

    @Generated
    public String getTerm() {
        return this.term;
    }

    @Generated
    public String getDefinition() {
        return this.definition;
    }

    @Generated
    public String getExample() {
        return this.example;
    }

    @Generated
    public void setId(final Long id) {
        this.id = id;
    }

    @Generated
    public void setTerm(final String term) {
        this.term = term;
    }

    @Generated
    public void setDefinition(final String definition) {
        this.definition = definition;
    }

    @Generated
    public void setExample(final String example) {
        this.example = example;
    }

    @Generated
    public Slang() {
    }

    @Generated
    public Slang(final Long id, final String term, final String definition, final String example) {
        this.id = id;
        this.term = term;
        this.definition = definition;
        this.example = example;
    }

    @Generated
    public static class SlangBuilder {
        @Generated
        private Long id;
        @Generated
        private String term;
        @Generated
        private String definition;
        @Generated
        private String example;

        @Generated
        SlangBuilder() {
        }

        @Generated
        public SlangBuilder id(final Long id) {
            this.id = id;
            return this;
        }

        @Generated
        public SlangBuilder term(final String term) {
            this.term = term;
            return this;
        }

        @Generated
        public SlangBuilder definition(final String definition) {
            this.definition = definition;
            return this;
        }

        @Generated
        public SlangBuilder example(final String example) {
            this.example = example;
            return this;
        }

        @Generated
        public Slang build() {
            return new Slang(this.id, this.term, this.definition, this.example);
        }

        @Generated
        public String toString() {
            return "Slang.SlangBuilder(id=" + this.id + ", term=" + this.term + ", definition=" + this.definition + ", example=" + this.example + ")";
        }
    }
}
