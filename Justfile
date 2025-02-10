alias install := install-dependencies

# Minimum version requirement 
MDBOOK_VERSION := "^0.4"

[doc("List available commands")]
default:
    just --list 


[doc("Install dependencies")]
install-dependencies:
    cargo install --version {{MDBOOK_VERSION}} mdbook
    cargo install mdbook-embedify
    cargo install mdbook-alerts
    cargo install mdbook-repl
    cargo install mdbook-quiz
    cargo install mdbook-mermaid
    cargo install mdbook-last-changed
    cargo install mdbook-codeblocks
    cargo install mdbook-tabs
    cargo install mdbook-cmdrun


[doc("Build the book and open it in the browser")]
watch:
    mdbook serve --open 

[doc("Checkout a pull request to a new branch")]
checkout-pr PR_NUMBER BRANCH_NAME: 
    git fetch origin pull/${PR_NUMBER}/head:${BRANCH_NAME}
    git checkout ${BRANCH_NAME}