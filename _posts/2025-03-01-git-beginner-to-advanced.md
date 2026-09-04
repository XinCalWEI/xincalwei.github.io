---
layout: post
title: "Git: From Beginner to Advanced"
date: 2025-03-01
description: A practical Git workflow, common commands, and learning resources from beginner to advanced
tags:
  - "Developer Tools"
categories: tutorial
thumbnail: assets/img/blog/learninggit.png
related_posts: false
toc:
  sidebar: right
---

## Recommended Learning Resources

### [Resource 1: Learn Git Branching](https://learngitbranching.js.org/)

An interactive visual guide to learning Git branching and workflows.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        <a href="https://learngitbranching.js.org/" target="_blank">
            {% include figure.liquid loading="eager" path="assets/img/blog/learninggit.png" class="img-fluid rounded z-depth-1" zoomable=true %}
        </a>
    </div>
</div>

---

### [Resource 2: Pro Git Book - Git Basics](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository)

The official Git documentation covering fundamental Git concepts and repository management.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        <a href="https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository" target="_blank">
            {% include figure.liquid loading="eager" path="assets/img/blog/git2.png" class="img-fluid rounded z-depth-1" zoomable=true %}
        </a>
    </div>
</div>

---

## My Practical Git Workflow 🧭

Most of what I know about Git came from maintaining websites and research projects, making small mistakes, and gradually building a workflow I could trust. Git became much less intimidating when I stopped treating it as a list of commands and started using three checkpoints: **inspect the repository, stage intentionally, and inspect again before committing**.

The examples below use generic names such as `USERNAME`, `REPOSITORY`, `feature/site-update`, and `path/to/file`. They can be adapted without exposing local folders, account details, or project-specific information.

### 1. Start from a known state 🧭

Before editing anything, I confirm where I am and whether the repository is clean.

- `git branch --show-current` _(Shows which branch I am standing on right now.)_
- `git rev-parse --show-toplevel` _(Shows the root folder of the Git repository I am currently working in.)_
- `git status` _(Gives me the full picture of what is modified, staged, or still untracked.)_
- `git fetch --prune origin` _(Updates my view of the remote repository and removes references to remote branches that no longer exist.)_
- `git switch main` _(Moves me back to the main branch before I synchronize or begin a new task.)_
- `git pull --ff-only origin main` _(Downloads the newest main branch only when Git can update it cleanly without creating a surprise merge commit.)_
- `git switch -c feature/site-update` _(Creates a new branch and moves me onto it in one step.)_
- `git switch feature/site-update` _(Moves me to a branch that already exists.)_

The older command `git checkout -b feature/site-update` _(Does the same create-and-switch job, but I find the newer `git switch` wording easier to understand.)_

For a few closely related follow-up edits, I may continue on the same branch. Once a pull request has been merged, however, starting a fresh branch from the latest `main` usually keeps the next review much easier to follow.

### 2. Inspect before staging 🔍

I check the repository again after editing. This is where I catch temporary files, generated outputs, and changes I did not mean to include.

- `git status --short` _(Shows a compact list of changed files and their two-letter status codes.)_
- `git diff --stat` _(Summarizes the unstaged files and the size of their changes.)_
- `git diff` _(Shows the exact unstaged line-by-line changes I have made.)_
- `git diff -- path/to/file` _(Shows the unstaged changes for one specific file.)_
- `git ls-files --others --exclude-standard` _(Lists only new untracked files while respecting `.gitignore`.)_

The short status symbols are especially useful:

| Symbol | Plain-language meaning                               |
| ------ | ---------------------------------------------------- |
| `??`   | A new file that Git is not tracking yet              |
| ` M`   | A tracked file changed, but the change is not staged |
| `M `   | A tracked modification is staged for the next commit |
| `A `   | A new file is staged for the next commit             |
| `D `   | A deletion is staged for the next commit             |

Some terminal themes also show a symbol such as `*` or `✭` beside the branch name. That usually means the working tree is not completely clean; `git status` _(Explains the actual reason instead of making me guess what the prompt symbol means.)_

### 3. Stage deliberately 📦

I prefer adding specific files when a change is small. Broad staging commands are convenient, but they deserve an immediate review. A stray log or transcript once reminded me that “new file” does not automatically mean “file that belongs in the repository.”

- `git add path/to/file` _(Stages one file I have deliberately chosen.)_
- `git add path/to/file another/file` _(Stages several named files without sweeping in everything else.)_
- `git add .` _(Stages changes under the current directory, so the directory where I run it matters.)_
- `git add -u` _(Stages modifications and deletions to tracked files, but leaves brand-new untracked files alone.)_
- `git add -A` _(Stages every addition, modification, and deletion in the repository, including new files.)_
- `git restore --staged path/to/file` _(Takes a file back out of the next commit without deleting my local copy or edits.)_

### 4. Review, then commit ✅

Staging is not the finish line. I inspect the staged snapshot—the exact content that the commit will contain.

- `git --no-pager diff --cached --stat` _(Summarizes the staged files and line counts without opening an interactive pager.)_
- `git diff --cached` _(Shows the complete staged patch that will become the next commit.)_
- `git commit -m "Describe the change clearly"` _(Saves the staged snapshot locally with a short explanation of why it exists.)_
- `git log -1 --oneline --decorate` _(Confirms the newest commit and shows which branch or tag points to it.)_

A blank `git diff --cached` _(Means nothing is currently staged, even if untracked or unstaged files still exist.)_ Likewise, “nothing added to commit but untracked files present” simply means Git sees new local files but has not been told to include them.

### 5. Push and open a pull request 🚀

- `git push -u origin feature/site-update` _(Publishes a new branch and remembers its remote partner for future pushes.)_
- `git push` _(Uploads new commits after the local branch already has an upstream branch.)_
- `git push --dry-run origin HEAD` _(Checks where and whether a push would work without actually uploading anything.)_
- `git remote -v` _(Shows the remote addresses Git currently uses for fetching and pushing.)_
- `git remote set-url origin https://github.com/USERNAME/REPOSITORY.git` _(Updates a saved remote address when a repository moves or is renamed.)_

One distinction took me time to internalize: a push uploads **commits**, not every file sitting in the folder. An untracked file stays on my computer unless I stage it and include it in a commit.

After pushing a feature branch, I normally open a pull request, let the automated checks finish, review the changed files once more, and then merge into `main`.

### 6. Synchronize after merging 🔄

- `git fetch --prune origin` _(Refreshes remote information and clears stale remote-branch references.)_
- `git switch main` _(Returns me to the branch that represents the published project.)_
- `git pull --ff-only origin main` _(Brings the merged work back to my local main branch without creating an unnecessary merge commit.)_
- `git branch -d feature/site-update` _(Deletes a fully merged local branch while refusing to remove one that may still contain unmerged work.)_
- `git push origin --delete feature/site-update` _(Removes the remote feature branch after I no longer need it.)_

### 7. Occasional setup commands 🛠️

These are not part of every editing session, but they are useful when beginning a repository or moving to a new computer.

- `git clone https://github.com/USERNAME/REPOSITORY.git` _(Downloads an existing repository and configures its remote automatically.)_
- `git init` _(Turns the current folder into a new local Git repository.)_
- `git remote add origin https://github.com/USERNAME/REPOSITORY.git` _(Connects a new local repository to its GitHub repository.)_
- `git config --get user.name` _(Shows the author name Git will attach to my commits.)_
- `git config --get user.email` _(Shows the author email Git will attach to my commits.)_
- `git check-ignore -v path/to/file` _(Explains whether a file is ignored and identifies the rule responsible.)_

### Commands I treat with extra care ⚠️

- `git restore path/to/file` _(Discards unstaged edits in that file, so I check the diff before using it.)_
- `git branch -D feature/site-update` _(Force-deletes a local branch even when its work has not been merged.)_
- `git reset --hard` _(Forces tracked files back to a commit and can permanently erase uncommitted work.)_

My simplest rule is still the most useful: when I am unsure, I run `git status` _(Shows the current situation without changing anything.)_ before I run a command that changes state.
