

[doc("List available commands")]
default:
    just --list 


[doc("Install dependencies")]
install-dependencies:
    cargo install --version ${MDBOOK_VERSION} mdbook
    cargo install mdbook-embedify
    cargo install mdbook-alerts
    cargo install mdbook-repl
    cargo install mdbook-quiz
    cargo install mdbook-mermaid
    cargo install mdbook-last-changed
    cargo install mdbook-codeblocks
    cargo install mdbook-tabs


[doc("Build the book and open it in the browser")]
dev:
    mdbook serve --open 