---
number: 006
slug: 006-does-p-equal-np
title: Does P equal NP?
field: Mathematics
posed: 1971
added: 2026-08-16
status: open
teaser: If checking an answer is easy, is finding one easy too? A million-dollar question about the nature of difficulty itself.
---
Some problems are easy to solve. Some are easy to check. Sudoku is the everyday example: filling a hard grid can take an evening, but verifying a finished one takes a minute. P is the class of problems computers can solve quickly; NP is the class whose solutions can be checked quickly. The question, formalized by Stephen Cook in 1971, is whether these are secretly the same class. Is there a fast method for everything whose answer is fast to verify? Nearly every expert believes the answer is no. After more than fifty years, nobody can prove it.

## Why it matters

This is not bookkeeping about computers; it is a question about the structure of difficulty. Thousands of practical problems, scheduling, protein folding, chip layout, optimal routing, are NP-complete: crack any one of them fast and you crack them all. If P equals NP with a practical algorithm, modern encryption collapses, since codes are exactly things easy to check and meant to be hard to find. Stranger consequences follow: finding a mathematical proof is hard, but checking one is easy, so mathematics itself would become mechanizable. The gap between recognizing a solution and producing one looks like the gap between appreciating and creating. P versus NP asks whether that gap is real.

## What has been tried

Enough that we now have theorems about why we keep failing. Three famous barriers, relativization, natural proofs, and algebrization, show that entire families of proof techniques, including nearly everything in the standard toolbox, provably cannot settle the question. The field has, in effect, mapped the walls of its own prison. Circuit complexity, the most direct attack, produced beautiful partial results in the 1980s and then hit those walls. The Clay Mathematics Institute has offered a million dollars since 2000. Claimed proofs arrive every year; none has survived review.

## Where the edge is

Progress now comes sideways: understanding the barriers, proving hardness in restricted models, and the geometric complexity theory program, a decades-long attempt to reach the problem through algebraic geometry. The honest status: we cannot even rule out that P equals NP, we just have never met a fast algorithm that smelled like it.

## What would count as an answer

A proof either way, even a wildly non-constructive one. This entry has the cleanest exit condition in the catalog: one accepted paper, and it moves to the solved room.
