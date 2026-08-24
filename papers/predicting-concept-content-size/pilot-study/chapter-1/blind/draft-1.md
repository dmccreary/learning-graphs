# Foundations of Algebra

## Summary

This chapter introduces the fundamental building blocks of algebra that serve as the foundation for all future mathematical study. Students will learn to identify and work with variables, constants, coefficients, terms, and expressions while mastering the essential order of operations. By the end of this chapter, students will understand how algebraic language represents mathematical relationships and be prepared to manipulate algebraic expressions with confidence.

## Concepts Covered

1. Number
2. Variable
3. Constant
4. Coefficient
5. Term
6. Expression
7. Equation
8. Inequality
9. Order of Operations
10. Evaluating Expressions
11. Substitution
12. Like Terms
13. Combining Like Terms
14. Simplifying Expressions
15. Expanding Expressions
16. Monomial
17. Prime Factorization

## Prerequisites

This chapter assumes only the prerequisites listed in the course description (basic arithmetic).

---

!!! mascot-welcome "Welcome!"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Let's figure this out! Algebra can feel like a brand-new language the first time you see it, full of letters mixed in with numbers. But every single piece of that language is built from a small set of simple ideas. In this chapter, we will meet those building blocks one at a time — numbers, variables, constants, coefficients, terms, expressions, and equations — so that by the end, you can read and write algebra with real confidence.

## Core Concepts

### 1. Number

Algebra rests on top of arithmetic, and arithmetic rests on top of **numbers**. A number is a mathematical object that represents an amount, a position on a number line, or a measurement — something you can count, order, compare, or compute with. Long before algebra introduces letters that stand for unknown values, you have already spent years working with numbers: counting objects, measuring distances, making change, and tracking scores. Algebra takes that familiar idea and asks a new kind of question — what if we do not yet know exactly which number belongs in a spot? To answer that question well, it helps to know the different families of numbers algebra draws from.

Mathematicians sort numbers into nested categories, where each larger category contains all of the ones before it.

- **Natural numbers** are the basic counting numbers: \(1, 2, 3, 4, \ldots\)
- **Whole numbers** are the natural numbers together with zero: \(0, 1, 2, 3, \ldots\)
- **Integers** extend the whole numbers to include negative values: \(\ldots, -2, -1, 0, 1, 2, \ldots\)
- **Rational numbers** are any numbers that can be written as a fraction of two integers, such as \(\frac{3}{4}\) or \(-5\) (since \(-5 = \frac{-5}{1}\)). Every terminating or repeating decimal, like \(0.5\) or \(0.333\ldots\), is rational.
- **Irrational numbers** cannot be written as a simple fraction. Their decimal expansions continue forever without ever settling into a repeating pattern, as with \(\pi\) or \(\sqrt{2}\).
- **Real numbers** include every rational number and every irrational number combined. Nearly every number you will use in Algebra I is a real number.

The table below summarizes these categories and gives an example of each:

| Number Set | What It Includes | Example |
|---|---|---|
| Natural numbers | Counting numbers starting at 1 | 5 |
| Whole numbers | Natural numbers plus zero | 0 |
| Integers | Whole numbers plus negatives | \(-7\) |
| Rational numbers | Fractions of two integers | \(\frac{2}{3}\) |
| Irrational numbers | Non-repeating, non-terminating decimals | \(\sqrt{2}\) |
| Real numbers | All rational and irrational numbers | \(-\frac{1}{2}\), \(\pi\), \(9\) |

Understanding these categories matters in algebra because every variable, constant, and coefficient you will meet later in this chapter ultimately stands for some number. Knowing what "counts" as a number — and which numbers are possible in a given situation — is a skill you will lean on constantly, whether you are checking that an answer makes sense or deciding which values are even allowed to replace a variable.

**Worked Example:** Classify each number in the list \(-4, \ \frac{7}{2}, \ 0, \ \sqrt{9}, \ \pi\) using the most specific category that applies.

- \(-4\) is an integer (it is negative, so it is not a whole or natural number), and every integer is also rational and real.
- \(\frac{7}{2}\) is a fraction of two integers that does not simplify to a whole number, so it is rational and real, but not an integer.
- \(0\) is a whole number, and therefore also an integer, a rational number, and a real number.
- \(\sqrt{9}\) looks irrational at first glance, but \(\sqrt{9} = 3\), which is a natural number, a whole number, an integer, a rational number, and a real number.
- \(\pi\) cannot be written as a fraction of integers, so it is irrational — but it is still a real number.

<details markdown="1">
#### Diagram: Nested Number Sets
A diagram of five nested circles, largest to smallest: Real Numbers on the outside, containing Rational Numbers and Irrational Numbers side by side (not overlapping), with Integers nested inside Rational Numbers, Whole Numbers nested inside Integers, and Natural Numbers nested inside Whole Numbers. Sample numbers like \(-4\), \(\frac{7}{2}\), \(0\), and \(\pi\) are placed inside the correct rings to show how each one is classified.
</details>

### 2. Variable

A **variable** is a letter or symbol that stands in for a number that is unknown, that can change, or that could take on many different values. Variables are what make algebra different from arithmetic: instead of only working with numbers you already know, algebra lets you reason about numbers you have not pinned down yet. The letters \(x\), \(y\), and \(n\) are common choices for variables, but any letter can serve this role.

!!! mascot-thinking "Why do we even need variables?"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Suppose a rectangle's length is always twice its width, but the width itself could be anything. How would you describe that relationship without knowing a specific number? Let's figure this out! If we let \(w\) stand for the width, no matter what value it ends up being, we can write the length as \(2w\). The variable \(w\) lets us describe a *pattern* that holds true for every possible width, all at once — that is the real power of algebra.

Variables show up in three closely related situations, and recognizing which one you are in helps you understand what the variable is really doing:

- **An unknown value to find**, as in \(x + 5 = 12\), where \(x\) represents one specific number waiting to be discovered.
- **A quantity that varies**, as in a formula for distance, \(d = 60t\), where \(t\) can represent any number of hours and \(d\) changes along with it.
- **A general placeholder in a rule**, as in the commutative property \(a + b = b + a\), where \(a\) and \(b\) stand for any real numbers whatsoever, showing that the rule always works.

Because a variable can represent so many different values, it helps to picture it as an empty box or a blank waiting to be filled in. Once you substitute a specific number for the variable, that number "fills the box" for that particular case.

**Worked Example:** A school club charges \$3 per ticket to a fundraiser. Let \(n\) be the number of tickets sold. Write a variable expression for the total money raised, then find the total when \(n = 40\).

The total money raised depends on how many tickets are sold, and each ticket contributes \$3, so the total is \(3n\) dollars — here, \(n\) is the variable representing the unknown or changing number of tickets. When \(n = 40\), we replace the variable with 40 to get \(3 \times 40 = 120\), so the club raises \$120 when it sells 40 tickets. Notice that the same expression, \(3n\), works no matter how many tickets are sold; only the value of \(n\) changes from one situation to the next.

| Tickets Sold (\(n\)) | Expression | Total Raised |
|---|---|---|
| 10 | \(3n\) | \$30 |
| 25 | \(3n\) | \$75 |
| 40 | \(3n\) | \$120 |

This table shows the same variable expression, \(3n\), producing a different result for each different value of the variable — which is exactly the flexibility that makes variables so useful throughout algebra.

!!! mascot-tip "A quick naming tip"
    ![Sage giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Any letter can be a variable, but some letters are traditional for certain jobs: \(x\), \(y\), and \(z\) often represent unknown numbers; \(n\) often counts items; and \(t\) often represents time. These are just conventions, not strict rules — the math works the same either way.

### 3. Constant

A **constant** is a quantity in an algebraic expression or equation whose value never changes. Unlike a variable, which can represent many different numbers depending on the situation, a constant is locked in at one fixed value from the start. The numbers \(5\), \(-12\), and \(\frac{1}{2}\) are all constants: no matter what else happens in a problem, \(5\) always means exactly five.

Constants appear everywhere in algebraic expressions, often standing for a fixed amount that gets added, subtracted, or otherwise combined with variable terms. In the expression \(3n + 7\), the number \(7\) is a constant — it does not depend on \(n\) at all, and it stays exactly \(7\) whether \(n\) is \(1\), \(100\), or \(-6\). By contrast, the \(3n\) part changes as \(n\) changes, because \(n\) is a variable.

It is worth noticing that even though a constant's *value* never changes, the same symbol can be used as a constant in one problem and might represent a different fixed number in another problem. What makes a quantity a constant is not which specific number it is, but the fact that within a given expression or equation, it is not allowed to vary. This distinction between "fixed within a problem" and "fixed forever" is subtle, but it explains why formulas can reuse letters like \(b\) for one flat fee in one problem and a completely different flat fee in the next.

**Worked Example:** A taxi charges a flat \$4 fee just for getting in the cab, plus \$2 for every mile driven. If \(m\) is the number of miles driven, write an expression for the total fare, and identify the constant.
The total fare has two parts: a fixed \$4 that is charged no matter how far you travel, and a variable part, \(2m\), that grows with the number of miles. Putting these together gives the expression \(2m + 4\). Here, \(4\) is the constant, because it never changes regardless of how many miles are driven — even a one-block ride and a fifty-mile ride both start with that same \$4 flat fee. The value \(2m\) is not constant, since it depends on \(m\).

| Miles Driven (\(m\)) | Variable Part (\(2m\)) | Constant | Total Fare |
|---|---|---|---|
| 3 | \$6 | \$4 | \$10 |
| 10 | \$20 | \$4 | \$24 |
| 0 | \$0 | \$4 | \$4 |

Notice in the table that the constant, \$4, stays exactly the same in every row, even as the variable part changes dramatically. This is the defining feature of a constant, and it is a feature you will rely on constantly once you begin combining constants with variable terms in longer expressions and equations. Recognizing constants quickly, as a reflex, will make nearly every later skill in this chapter — from identifying terms to simplifying expressions — noticeably faster and more accurate.

!!! mascot-warning "Common mistake"
    ![Sage warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    It is tempting to think a constant must always be a small, simple number like \(1\) or \(2\), but a constant can be any fixed real number, including fractions, decimals, or negative numbers, such as \(-9\) or \(\frac{3}{4}\). What makes it a constant is that it does not change — not what the number looks like.

### 4. Coefficient

A **coefficient** is the numerical factor that multiplies a variable in a term. In the expression \(5x\), the coefficient is \(5\), because it is the number being multiplied by the variable \(x\). Coefficients tell you *how many* of a variable quantity you have, in the same way that the number in front of a unit tells you how many of that unit are present — just as "5 apples" means five copies of one apple, "\(5x\)" means five copies of whatever \(x\) represents.

Coefficients can be positive, negative, whole numbers, or fractions. In \(-3y\), the coefficient is \(-3\). In \(\frac{1}{2}h\), the coefficient is \(\frac{1}{2}\). When a variable appears by itself with no visible number in front of it, such as in \(x\) or \(w\), the coefficient is understood to be \(1\), since \(x\) means the same thing as \(1x\). In the same way, \(-x\) means \(-1x\), so its coefficient is \(-1\) even though the digit \(1\) never actually appears.

It helps to compare a coefficient with a constant, since both are numbers but they play different roles. A coefficient is always attached to a variable and multiplies it; a constant stands alone and is not multiplied by any variable. It also helps to compare a coefficient with the variable it multiplies: the coefficient tells you the *size* of the term, while the variable tells you *what kind* of quantity is being counted. Two terms can share the same variable and still behave very differently once their coefficients differ — \(2x\) and \(200x\) both describe "some number of \(x\)'s," but they scale that quantity in dramatically different ways.

| Term | Coefficient | Variable Part |
|---|---|---|
| \(5x\) | \(5\) | \(x\) |
| \(-3y\) | \(-3\) | \(y\) |
| \(\frac{1}{2}h\) | \(\frac{1}{2}\) | \(h\) |
| \(w\) | \(1\) (understood) | \(w\) |

**Worked Example:** A movie theater sells bags of popcorn for \$6 each. If \(p\) is the number of bags sold, the revenue from popcorn is \(6p\). Identify the coefficient and explain what it represents in this real-world situation.

In the term \(6p\), the coefficient is \(6\). It represents the price, in dollars, of a single bag of popcorn — the fixed amount that multiplies however many bags get sold. If the theater instead offered a bulk discount and reduced the price to \$5.50 per bag, the coefficient would change to \(5.5\), giving the new term \(5.5p\). Notice that changing the coefficient changes the entire relationship between bags sold and revenue earned, even though the variable \(p\) still represents the same idea: the number of bags. This is why coefficients matter so much in algebra — they scale a variable up or down, and even a small change to a coefficient can have a large effect once the variable takes on bigger values.

Coefficients become especially important later in this chapter, once you start combining terms that share the same variable, because adding or subtracting terms with matching variable parts really means adding or subtracting their coefficients. Learning to read a coefficient correctly now — including catching the "invisible" coefficient of \(1\) and the sign attached to a negative coefficient — will save you from a whole category of errors once expressions grow longer and more complicated.

### 5. Term

A **term** is a single number, a single variable, or numbers and variables multiplied together, with no addition or subtraction inside it. Terms are the individual building blocks that get added or subtracted to form larger algebraic expressions. In the expression \(4x + 7\), there are two terms: \(4x\) and \(7\). The plus sign separates them, but each piece on its own — \(4x\) alone, or \(7\) alone — counts as one term.

A term can take several forms. It might be a single constant, like \(9\); a single variable, like \(y\); or a coefficient multiplied by one or more variables, like \(6x\) or \(3xy\). What makes something a *single* term is that everything inside it is connected only by multiplication or division, never by addition or subtraction — as soon as a plus or minus sign appears, it marks the boundary between one term and the next.

Terms give algebra a natural sense of structure. Just as a sentence is built from individual words, an expression is built from individual terms, and learning to spot where one term ends and the next begins is one of the very first reading skills algebra requires. Once you can reliably pick out the terms in an expression, you can start asking more useful questions about it, such as which terms share a variable, which terms are constants, and which terms could eventually be combined.

| Expression | Terms | Number of Terms |
|---|---|---|
| \(8\) | \(8\) | 1 |
| \(3x\) | \(3x\) | 1 |
| \(4x + 7\) | \(4x\), \(7\) | 2 |
| \(2y - 5x + 9\) | \(2y\), \(-5x\), \(9\) | 3 |

Notice in the last row of the table that the sign directly in front of a term travels with it. In \(2y - 5x + 9\), the second term is \(-5x\), not \(5x\), because the subtraction sign belongs to that term. This detail matters a great deal once you start rearranging or combining terms, since dropping or misplacing a sign changes the value of the entire expression.

**Worked Example:** Identify the terms in the expression \(7x^2 - 4x + 10\), and state the coefficient and constant found among them.

Reading from left to right and treating each plus or minus sign as a break point, this expression has three terms: \(7x^2\), \(-4x\), and \(10\). The first term, \(7x^2\), has a coefficient of \(7\) attached to the variable part \(x^2\). The second term, \(-4x\), has a coefficient of \(-4\) attached to the variable \(x\). The third term, \(10\), has no variable attached at all, so it is a constant rather than a variable term. Breaking an expression into its terms this way is often the very first step in simplifying it, because it reveals exactly which pieces are allowed to combine with each other later on.

You have now met several closely related ideas — variables, constants, coefficients, and terms — in a short span, and that is completely normal to find tricky at first. Every one of these ideas will keep reappearing throughout the rest of this course, so you will get plenty of extra practice recognizing them, one expression at a time.

### 6. Expression

An **expression** is a mathematical phrase made up of one or more terms, combined using operations like addition, subtraction, multiplication, or division, but containing no equals sign. Expressions describe a value or a relationship, but unlike equations, they do not claim that two things are equal to each other. \(3x + 2\), \(7\), and \(y^2 - 4y + 1\) are all expressions.

Because an expression is built entirely out of terms, everything you have already learned about numbers, variables, constants, coefficients, and terms comes together here. An expression might contain a single term, like \(9\) or \(5x\), or it might combine several terms with addition and subtraction, like \(4x - 3y + 8\). What every expression has in common is that it represents a value — a value that may depend on one or more variables — without asserting that value equals anything in particular.

A useful way to think about an expression is as a set of instructions for a calculation that has not been finished yet, because you do not yet know the variable's value. The expression \(2x + 5\) tells you exactly what to do once you know \(x\): multiply it by \(2\), then add \(5\). Until a specific number is substituted for \(x\), the expression simply represents that unfinished process. Expressions can also contain no variable at all — an expression like \(6 + 9\) is still an expression, just one whose value happens to be fixed rather than dependent on anything unknown.

| Expression | Terms | Type |
|---|---|---|
| \(12\) | \(12\) | Constant expression |
| \(6x\) | \(6x\) | Single-term expression |
| \(4x - 3y + 8\) | \(4x\), \(-3y\), \(8\) | Multi-term expression |

**Worked Example:** A rectangular garden has a width of \(w\) feet and a length that is \(3\) feet longer than its width. Write an expression for the garden's perimeter.

The length of the garden is \(w + 3\), since it is \(3\) feet longer than the width, \(w\). The perimeter of a rectangle is found by adding all four sides: two widths and two lengths, or \(w + w + (w + 3) + (w + 3)\). Combining the terms in this expression gives \(4w + 6\). This is an expression, not an equation, because it does not say the perimeter *equals* some particular number — instead, it describes how to calculate the perimeter for *any* width \(w\). If a gardener later tells you the width is \(5\) feet, you could substitute that value in to find a specific perimeter, but until then, \(4w + 6\) represents the general relationship.

Expressions are the raw material of algebra: nearly every equation, inequality, and formula you meet from this point forward is built by placing two expressions on either side of a relationship symbol, which is exactly the idea explored next. Learning to read an expression confidently — recognizing its terms, its coefficients, and its constants at a glance — is what makes every later topic in this course easier to approach.

### 7. Equation

An **equation** is a mathematical statement that two expressions are equal, connected by an equals sign, \(=\). While an expression simply represents a value, an equation makes a claim: it says that the expression on the left side has the exact same value as the expression on the right side. The statement \(3x + 2 = 11\) is an equation, because it asserts that the expression \(3x + 2\) and the expression \(11\) represent the same value.

!!! mascot-thinking "Expression or equation?"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Here is a question worth pausing on: is \(5x - 3\) an expression or an equation? Let's figure this out! Look for the equals sign. Since \(5x - 3\) has no equals sign, it is only an expression — a phrase representing a value. But \(5x - 3 = 12\) does have an equals sign, so it is an equation — a full statement claiming that \(5x - 3\) and \(12\) are equal. Spotting the equals sign is the single fastest way to tell these two ideas apart.

Because an equation makes a claim of equality, it can be true or false depending on what value is substituted for its variable. In the equation \(x + 4 = 9\), substituting \(x = 5\) makes the equation true, since \(5 + 4 = 9\). Substituting \(x = 2\) makes it false, since \(2 + 4 = 6\), not \(9\). The value or values that make an equation true are called its **solutions**. Much of the algebra you will study this year is devoted to finding those solutions, usually by carefully rearranging an equation, one step at a time, until the variable is isolated on one side by itself.

| Statement | Expression or Equation? | Reason |
|---|---|---|
| \(6x + 1\) | Expression | No equals sign |
| \(6x + 1 = 19\) | Equation | Contains an equals sign |
| \(y - 8\) | Expression | No equals sign |
| \(y - 8 = 0\) | Equation | Contains an equals sign |

**Worked Example:** A number, increased by \(6\), equals \(20\). Write this as an equation, and check whether \(14\) is a solution.

Let \(n\) represent the unknown number. "Increased by 6" means adding 6, so the phrase translates to the equation \(n + 6 = 20\). To check whether \(14\) is a solution, substitute \(14\) in place of \(n\): \(14 + 6 = 20\), which is a true statement, so \(14\) is indeed a solution to this equation. If we had instead tried \(n = 10\), we would find \(10 + 6 = 16\), which does not equal \(20\), so \(10\) is not a solution. This process of substituting a candidate value and checking whether the resulting statement is true is one you will use throughout algebra, not just for equations but for inequalities as well, and it gives you a reliable way to double-check any answer you find, even before you have learned formal methods for solving equations.

### 8. Inequality

An **inequality** is a mathematical statement that compares two expressions using a symbol other than equals, showing that one side is greater than, less than, or otherwise not equal to the other. While an equation claims two expressions have the exact same value, an inequality claims a relationship of size or order between them instead.

The four most common inequality symbols are \(>\) (greater than), \(<\) (less than), \(\geq\) (greater than or equal to), and \(\leq\) (less than or equal to). The statement \(x > 5\) says that \(x\) can be any number strictly greater than \(5\), while \(x \leq 5\) says \(x\) can be \(5\) itself or anything smaller.

| Symbol | Meaning | Example |
|---|---|---|
| \(>\) | Greater than | \(x > 3\) |
| \(<\) | Less than | \(x < 3\) |
| \(\geq\) | Greater than or equal to | \(x \geq 3\) |
| \(\leq\) | Less than or equal to | \(x \leq 3\) |

Unlike most equations, which typically have one solution, an inequality usually has infinitely many solutions, since a whole range of numbers can satisfy it. The inequality \(x > 3\) is true for \(3.1\), for \(4\), for \(100\), and for every other real number greater than \(3\) — but not for \(3\) itself, since \(3\) is not *strictly* greater than \(3\).

**Worked Example:** A roller coaster requires riders to be at least 48 inches tall. Write this requirement as an inequality, and determine whether a rider who is 50 inches tall qualifies.

Let \(h\) represent a rider's height in inches. "At least 48 inches" means 48 inches or taller, which translates to \(h \geq 48\). To check a 50-inch rider, substitute \(h = 50\): since \(50 \geq 48\) is a true statement, this rider does qualify. A rider who is exactly 48 inches tall would also qualify, because the symbol \(\geq\) includes equality, while a rider who is 47 inches tall would not qualify, since \(47 \geq 48\) is false.

### 9. Order of Operations

The **order of operations** is the agreed-upon sequence for evaluating a mathematical expression that contains more than one operation, ensuring that everyone arrives at the same answer. Without a shared order, an expression like \(3 + 4 \times 2\) could be read two different ways, giving two different results.

The order of operations is often remembered using the acronym **PEMDAS**: Parentheses, Exponents, Multiplication and Division (from left to right), and Addition and Subtraction (from left to right).

| Step | Operation | Direction |
|---|---|---|
| 1 | Parentheses (and other grouping symbols) | Innermost first |
| 2 | Exponents | — |
| 3 | Multiplication and Division | Left to right |
| 4 | Addition and Subtraction | Left to right |

Without an agreed-upon order like this one, two people could look at the exact same expression and calculate two different, equally "correct-looking" answers. PEMDAS removes that ambiguity by giving every algebra student, everywhere, the same set of rules to follow, so an expression always has exactly one correct value.

Many students remember PEMDAS with the phrase "Please Excuse My Dear Aunt Sally." Just remember that multiplication and division are actually tied in rank, and so are addition and subtraction — within each of those pairs, you work left to right rather than always doing multiplication before division.

**Worked Example:** Evaluate \(3 + 4 \times 2^2 - (5 - 3)\) using the order of operations.

First, handle the parentheses: \(5 - 3 = 2\), so the expression becomes \(3 + 4 \times 2^2 - 2\). Next, handle the exponent: \(2^2 = 4\), giving \(3 + 4 \times 4 - 2\). Then perform multiplication: \(4 \times 4 = 16\), giving \(3 + 16 - 2\). Finally, work left to right through the addition and subtraction: \(3 + 16 = 19\), and \(19 - 2 = 17\). The expression evaluates to \(17\).

### 10. Evaluating Expressions

**Evaluating an expression** means finding its numerical value after replacing every variable with a specific number and then applying the order of operations. This is one of the most common tasks in algebra, since it connects the general, symbolic world of expressions back to concrete, specific numbers. Every formula you will ever use — for area, for distance, for interest earned on savings — is really just an expression waiting to be evaluated once real numbers are known.

To evaluate an expression, replace each variable with the given value, then carefully carry out the arithmetic in the correct order, using PEMDAS as your guide. The same expression can be evaluated over and over again with different input values, and each different input generally produces a different result, which is exactly what makes expressions so useful for describing relationships that change.

**Worked Example:** Evaluate the expression \(2x^2 + 3x - 1\) when \(x = 4\).

Replace every \(x\) with \(4\): \(2(4)^2 + 3(4) - 1\). Following the order of operations, evaluate the exponent first: \(4^2 = 16\), giving \(2(16) + 3(4) - 1\). Next, perform the multiplications: \(2 \times 16 = 32\) and \(3 \times 4 = 12\), giving \(32 + 12 - 1\). Finally, add and subtract from left to right: \(32 + 12 = 44\), and \(44 - 1 = 43\). So the expression \(2x^2 + 3x - 1\) evaluates to \(43\) when \(x = 4\).

| Value of \(x\) | \(2x^2 + 3x - 1\) | Result |
|---|---|---|
| \(0\) | \(2(0)^2 + 3(0) - 1\) | \(-1\) |
| \(1\) | \(2(1)^2 + 3(1) - 1\) | \(4\) |
| \(4\) | \(2(4)^2 + 3(4) - 1\) | \(43\) |

This table shows how the very same expression produces a completely different result for each different input, which is why the order of operations must be followed exactly the same way every single time — a shortcut or skipped step in one evaluation could easily produce a wrong answer that looks convincing.

### 11. Substitution

**Substitution** is the process of replacing a variable in an expression or equation with a specific number or another expression. Substitution is the mechanical step that makes evaluating expressions possible: before any arithmetic happens, the variable must first be swapped out for its given value. You already used substitution earlier in this chapter, both to evaluate expressions and to check whether a candidate number is a solution to an equation or an inequality — it is one of those foundational moves that quietly supports many other algebra skills.

Careful substitution often means placing the replacement value inside parentheses, especially when it is negative or when it will be raised to a power, so that the order of operations applies to it correctly. Skipping the parentheses is one of the most common sources of sign errors in all of algebra, so it is worth building the habit early.

**Worked Example:** Substitute \(x = -3\) into the expression \(x^2 - 2x\), and simplify.

Replacing \(x\) with \(-3\), written inside parentheses to keep the substitution clear, gives \((-3)^2 - 2(-3)\). Evaluating the exponent first, \((-3)^2 = 9\). Evaluating the multiplication next, \(2 \times (-3) = -6\), so \(-2(-3) = 6\). Combining these results gives \(9 + 6 = 15\). Notice that using parentheses around \(-3\) was essential here — without them, it would be easy to mistakenly compute \(-3^2\) as \(-9\) instead of the correct \(9\). This single-parentheses habit is small, but it protects you from one of the most frequent mistakes students make when a negative number meets an exponent.

### 12. Like Terms

**Like terms** are terms that have the exact same variable or variables raised to the exact same powers, though they may have different coefficients. The terms \(3x\) and \(7x\) are like terms, because both have the variable \(x\) raised to the first power. The terms \(3x\) and \(3x^2\) are *not* like terms, because the exponents on \(x\) do not match.

| Pair of Terms | Like Terms? | Reason |
|---|---|---|
| \(4x\), \(9x\) | Yes | Same variable, same exponent |
| \(5y\), \(5y^2\) | No | Different exponents |
| \(2xy\), \(-6xy\) | Yes | Same variables, same exponents |
| \(3x\), \(3y\) | No | Different variables |

Recognizing like terms is essential because only like terms can be combined into a single term. Constants are also considered like terms with each other, since a constant can be thought of as having a variable part of "none" — so \(8\) and \(-3\) are like terms, but \(8\) and \(3x\) are not. Notice that the coefficient plays no role at all in deciding whether two terms are "like" each other; \(2x\) and \(200x\) are like terms even though their coefficients are far apart, because what matters is only the variable part.

**Worked Example:** From the expression \(5x + 3y - 2x + 7\), identify all pairs of like terms.

The terms in this expression are \(5x\), \(3y\), \(-2x\), and \(7\). Comparing variable parts, \(5x\) and \(-2x\) share the same variable, \(x\), raised to the same power, so they are like terms. The term \(3y\) has no other term to match with, since no other term contains \(y\). The constant \(7\) also stands alone, since no other term is a bare constant. So the only like-term pair in this expression is \(5x\) and \(-2x\).

### 13. Combining Like Terms

**Combining like terms** means adding or subtracting the coefficients of like terms to merge them into a single term, which simplifies an expression without changing its value. Because like terms share the same variable part, only their coefficients need to be added or subtracted — the variable part stays the same. This step relies directly on everything you just practiced with like terms: before you can combine anything, you first have to correctly identify which terms are allowed to combine in the first place.

A helpful way to organize this process is to rearrange an expression so that like terms sit next to each other before adding their coefficients. In \(6x + 4 - 2x + 9\), grouping the \(x\)-terms together and the constant terms together — while keeping each term's sign attached to it — makes the combining step far less error-prone than trying to track everything mentally.

**Worked Example:** Combine like terms in the expression \(6x + 4 - 2x + 9\).

First, identify the like terms: \(6x\) and \(-2x\) are like terms, and \(4\) and \(9\) are like terms, since both are constants. Combining the \(x\)-terms means adding their coefficients: \(6 + (-2) = 4\), giving \(4x\). Combining the constants means adding \(4 + 9 = 13\). Putting the combined terms back together gives the simplified expression \(4x + 13\). This expression has the same value as the original for every possible value of \(x\), but it is written with fewer, more manageable terms. You can check that the two expressions are truly equivalent by substituting any value for \(x\), such as \(x = 2\): the original gives \(6(2) + 4 - 2(2) + 9 = 21\), and the combined form gives \(4(2) + 13 = 21\) as well.

### 14. Simplifying Expressions

**Simplifying an expression** means rewriting it in an equivalent but shorter or clearer form, typically by combining like terms and completing any possible arithmetic. A simplified expression represents the exact same value as the original for every value of its variables, just with fewer terms. Simplifying is less a single new skill than a goal that pulls together several skills you already have — spotting terms, recognizing which ones are alike, and combining their coefficients correctly.

A fully simplified expression has no more like terms left to combine and no arithmetic left undone; once you reach that point, there is nothing shorter you could write that still means the same thing.

**Worked Example:** Simplify \(3x + 5 + 2x - 1\).

Combine the like terms \(3x\) and \(2x\) to get \(5x\), then combine the constants \(5\) and \(-1\) to get \(4\). The simplified expression is \(5x + 4\), which cannot be shortened any further, since \(5x\) and \(4\) are not like terms and can no longer be combined with each other. Simplifying an expression before evaluating it can also save time, since there are fewer terms left to substitute into.

### 15. Expanding Expressions

**Expanding an expression** means removing parentheses by multiplying every term inside them by the factor outside, using the distributive property. Expanding is often the reverse of combining terms into a compact form — it spreads a multiplication out across an entire sum or difference. Where simplifying tends to make an expression shorter, expanding often makes it temporarily longer, trading a compact form with parentheses for an equivalent form without them.

Expanding is especially useful right before combining like terms, since an expression with parentheses often needs to be expanded first before any like terms become visible and can be combined.

**Worked Example:** Expand \(4(x + 3)\).

Multiply the factor outside the parentheses, \(4\), by each term inside: \(4 \times x = 4x\), and \(4 \times 3 = 12\). The expanded expression is \(4x + 12\). Notice that the value of the expression has not changed at all — only its form has, since substituting any number for \(x\) into either \(4(x+3)\) or \(4x + 12\) produces the same result, such as \(x = 5\), which gives \(32\) either way.

### 16. Monomial

A **monomial** is a single algebraic term made up of numbers and variables multiplied together, with no addition, subtraction, or division by a variable. Every monomial is a term, but the word "monomial" specifically emphasizes that it is exactly *one* term standing alone, rather than a sum of several terms. Examples of monomials include \(7\), \(x\), \(5x^2\), and \(-3xy\).

Although a monomial might look like a small, narrow vocabulary word, it turns out to be one of the most load-bearing ideas in this entire chapter. Every constant is a monomial. Every single-term product of a coefficient and a variable is a monomial. And, as you will see next, every larger expression made of several terms is really just a sum of monomials — which means the rules you already know about coefficients, variables, and exponents inside a single term are quietly doing work inside every expression you meet from here forward.

The word "monomial" comes from "mono," meaning one, and it belongs to a small family of words that describe expressions by how many terms they contain: a monomial has one term, a **binomial** has two terms, and a **trinomial** has three terms. An expression with more than three terms is usually just called a **polynomial**, a general term that covers monomials, binomials, and trinomials as well.

| Name | Number of Terms | Example |
|---|---|---|
| Monomial | 1 | \(5x^2\) |
| Binomial | 2 | \(5x^2 + 3\) |
| Trinomial | 3 | \(5x^2 + 3x - 1\) |

Monomials matter a great deal because they are the atomic units that every other algebraic expression is built from. A binomial is just two monomials joined by addition or subtraction; a trinomial is three. Understanding what makes a single monomial well formed — one coefficient, one collection of variables raised to whole-number powers, connected only by multiplication — makes it far easier to recognize how larger expressions are put together, and it sets the stage for polynomial operations you will study in later chapters.

**Worked Example:** Determine which of the following are monomials: \(6x^2\), \(3x + 2\), \(\frac{5}{x}\), and \(-9xy^3\).

\(6x^2\) is a monomial: it is a single term, a coefficient multiplied by a variable raised to a whole-number power. \(3x + 2\) is *not* a monomial, since it has two terms joined by addition, making it a binomial instead. \(\frac{5}{x}\) is *not* a monomial, because it involves dividing by a variable, which is not allowed in a monomial's structure. \(-9xy^3\) *is* a monomial: although it involves two different variables, they are only multiplied together, with whole-number exponents, forming a single term. Sorting expressions this way — checking for a single term, whole-number exponents, and no variable division — is a habit that will keep paying off well beyond this chapter, any time you need to classify or manipulate a polynomial.

### 17. Prime Factorization

**Prime factorization** is the process of writing a whole number as a product of only prime numbers — numbers greater than 1 whose only factors are 1 and themselves. Every whole number greater than 1 has exactly one prime factorization, which makes it a uniquely reliable way to break a number down into its most basic multiplicative pieces.

**Worked Example:** Find the prime factorization of \(60\).

Divide by the smallest prime, \(2\): \(60 = 2 \times 30\). Divide \(30\) by \(2\) again: \(30 = 2 \times 15\). Since \(15\) is not divisible by \(2\), move to the next prime, \(3\): \(15 = 3 \times 5\). Since \(5\) is already prime, the process stops. Putting the pieces together, \(60 = 2 \times 2 \times 3 \times 5\), or \(2^2 \times 3 \times 5\).

!!! mascot-celebration "You did it!"
    ![Sage celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Look at everything you can do now! You can classify numbers, name variables and constants, spot coefficients and terms, tell expressions apart from equations and inequalities, apply the order of operations, evaluate and simplify expressions, combine like terms, and even break a number down into its prime factors. Every one of these skills will keep showing up throughout the rest of this course. Great work — let's keep figuring things out together!

---
