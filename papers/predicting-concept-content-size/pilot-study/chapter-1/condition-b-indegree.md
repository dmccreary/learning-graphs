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
    Let's figure this out! In this chapter, we will build the vocabulary and tools that every future algebra topic depends on. We will learn what numbers and variables really are, how to combine them into terms and expressions, and how to compare and evaluate them with confidence. Think of this chapter as learning the alphabet before writing sentences — everything that comes later in this course is built from these pieces.

## Number

A number is a mathematical object that represents an amount, a position, or a measurement. Numbers are the most basic building blocks in mathematics, and they are also the most basic building blocks in algebra. Before we can talk about variables, expressions, or equations, we need a shared understanding of what a number is and how different kinds of numbers relate to one another.

Not every number is the same kind of thing. Mathematicians sort numbers into categories based on their properties, and each category builds on the one before it, like a set of nested boxes.

- **Natural numbers** are the counting numbers: 1, 2, 3, 4, and so on. They are the numbers you use when you count objects, and they never include zero or negative values.
- **Whole numbers** include all the natural numbers plus zero: 0, 1, 2, 3, and so on.
- **Integers** include all the whole numbers plus their negative counterparts: \( \ldots, -3, -2, -1, 0, 1, 2, 3, \ldots \)
- **Rational numbers** are numbers that can be written as a fraction of two integers, such as \( \frac{1}{2} \), \( \frac{3}{4} \), or even \( 5 \) (which can be written as \( \frac{5}{1} \)). Rational numbers include decimals that terminate or repeat, like 0.5 or 0.333...
- **Irrational numbers** cannot be written as a simple fraction. Their decimal forms continue forever without repeating, such as \( \pi \) or \( \sqrt{2} \).
- **Real numbers** include every rational number and every irrational number combined. Nearly every number you will work with in Algebra 1 is a real number.

Every natural number is also a whole number, every whole number is also an integer, every integer is also rational, and every rational or irrational number belongs to the set of real numbers. This nesting means that when someone tells you a number is "natural," you automatically know several other true things about it as well.

One of the most useful tools for thinking about numbers is the number line, a straight line on which every point corresponds to exactly one real number.

<details markdown="1">
#### Diagram: The Real Number Line
A horizontal line stretching left to right, with zero marked at the center. Evenly spaced tick marks extend in both directions, labeled with negative integers to the left of zero (-5, -4, -3, -2, -1) and positive integers to the right (1, 2, 3, 4, 5). Arrows on both ends show that the line continues without end in both directions. Small labeled points between the integers show where a fraction such as \( \frac{1}{2} \) and an irrational number such as \( \sqrt{2} \) would fall, illustrating that the real numbers fill in every gap between the integers with no empty space left over.
</details>

On a number line, numbers farther to the right are always greater than numbers to the left of them. This idea of order lets us compare numbers, decide which of two numbers is larger, and later, decide whether an inequality is true or false. Positive numbers sit to the right of zero, and negative numbers sit to the left of zero. Zero itself is neither positive nor negative — it is the reference point every other number is measured from.

Numbers show up constantly outside of math class, too. A temperature of \( -5 \) degrees is colder than a temperature of \( 3 \) degrees because \( -5 \) sits farther to the left on the number line. A bank balance of \( -20 \) dollars represents a debt, while a balance of \( 20 \) dollars represents savings. These everyday situations are exactly why negative numbers and the number line matter — algebra uses them to model real quantities that can increase, decrease, or fall below zero.

Every constant, every coefficient, and every value we substitute into a variable later in this chapter is, at its core, simply a number. When we evaluate an expression or solve an equation, we are almost always working to find a number — or a set of numbers — that makes a mathematical statement true. A flexible, confident understanding of what numbers are and how they compare to one another is the foundation that everything else in this course is built upon.

## Variable

A variable is a symbol, usually a letter, that represents a quantity that can change or that is not yet known. Instead of writing a specific number, algebra often uses a letter like \( x \), \( y \), or \( n \) to stand in for a value we are trying to find, or a value that can take on many different values depending on the situation.

Why letters instead of numbers? Because sometimes we do not know the value yet, and sometimes the value is meant to change. If a recipe scales with the number of guests, we might use \( g \) to represent "number of guests" so the same formula works whether 4 people or 40 people are coming to dinner. If we are trying to find a mystery number that, when doubled, equals 18, we can write \( 2x = 18 \) and use algebra to discover that \( x \) must be 9.

!!! mascot-thinking "Why letters?"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Before reading on, ask yourself: why might mathematicians prefer a letter like \( x \) over just leaving a blank space or a question mark? Think about what happens when the same unknown value appears more than once in a problem. A letter lets us refer to that exact same unknown quantity again and again, track it through several steps of reasoning, and even compare it to a *different* unknown represented by a different letter.

Certain letters have become traditional in algebra, though any letter can technically serve as a variable.

| Letter | Common Use |
|---|---|
| \( x, y, z \) | General unknown quantities, especially in equations and graphing |
| \( n \) | A count of items, often a whole number |
| \( t \) | Time |
| \( a, b, c \) | Constants or coefficients in general formulas |

A variable can represent a single unknown number that we are solving for, as in \( x + 7 = 12 \), where \( x \) must equal 5. A variable can also represent a quantity that genuinely varies across many situations, as in the formula for the area of a rectangle, \( A = lw \), where \( l \) and \( w \) change depending on the rectangle being measured. In both cases, the letter is a placeholder that lets us write a general mathematical idea once, instead of writing a separate calculation for every possible number.

Variables are especially useful for describing quantities that change over time or across circumstances. The outside temperature at different hours of the day, the distance a car has traveled after a certain number of minutes, or the amount of money in a savings account after a certain number of months are all naturally described using a variable, because the same relationship applies no matter what specific hour, minute, or month we plug in. A weather scientist might write \( T \) for temperature, an engineer might write \( d \) for distance, and an accountant might write \( m \) for money — the letter itself is just a label, chosen for convenience, while the real mathematical idea lives in how that letter is used inside an expression or equation.

It is worth noticing that a variable by itself, such as \( x \), does not tell us its value. Its value depends on the context: the equation it appears in, the formula it is part of, or the specific numbers we choose to substitute in later in this chapter. This flexibility is exactly what makes algebra so powerful — a single equation written with variables can describe an unlimited number of specific numerical situations, from calculating a paycheck to predicting the path of a thrown ball.

## Constant

A constant is a value in an algebraic expression or equation that does not change. Unlike a variable, whose value can shift depending on the situation, a constant always represents the same fixed number no matter what.

Consider the expression \( 3x + 5 \). Here, \( x \) is a variable — its value can be anything — but the \( 5 \) is a constant. No matter what number \( x \) turns out to be, that \( 5 \) never changes. It is called a "constant" precisely because it stays constant, or fixed, throughout the entire problem.

A constant can be positive, negative, a whole number, a fraction, or a decimal — it simply stands on its own as a fixed numerical value within a larger expression or equation, with no letter attached.

- In \( 2y - 9 \), the constant is \( -9 \).
- In \( \frac{1}{2}x + 4.5 \), the constant is \( 4.5 \).
- In \( 8 \), the constant is the entire expression, since \( 8 \) is simply a fixed number by itself.

Constants often represent something fixed in a real-world situation, such as a flat delivery fee that stays the same no matter how many items you order, or a starting height before a plant begins to grow. In the equation \( x + 5 = 12 \), the \( 5 \) and the \( 12 \) are both constants, while \( x \) is the only piece of the equation allowed to change as we search for the value that makes the statement true.

Recognizing which part of an expression is fixed and which part can change is an essential skill for reading and building algebraic expressions correctly. As you meet longer and more complicated expressions later in this course, quickly spotting the constant will help you keep track of exactly what stays the same while everything else shifts around it.

## Coefficient

A coefficient is the numerical factor that multiplies a variable. In the expression \( 7x \), the number \( 7 \) is the coefficient of \( x \) — it tells us how many \( x \)'s we have, or how much to scale the variable by.

Coefficients can be positive or negative, whole numbers, fractions, or decimals. In \( -3y \), the coefficient is \( -3 \). In \( \frac{2}{3}n \), the coefficient is \( \frac{2}{3} \). A coefficient always sits directly next to the variable it multiplies, with no operation symbol needed between them — writing \( 7x \) means "7 times \( x \)."

!!! mascot-warning "Where did the 1 go?"
    ![Sage warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common mistake is thinking that a variable written by itself, like \( x \), has no coefficient at all. It actually does! When no number is written in front of a variable, the coefficient is understood to be \( 1 \). So \( x \) really means \( 1x \), and \( -x \) really means \( -1x \). Keeping this invisible \( 1 \) in mind will help you avoid errors later when combining variables together.

Coefficients tell us about scale and direction. A coefficient of \( 2 \) means "twice as much," a coefficient of \( \frac{1}{2} \) means "half as much," and a negative coefficient flips the sign of whatever value the variable ends up taking. In the expression \( 4x + 9 \), the coefficient \( 4 \) is multiplied only by \( x \) — it does not touch the \( 9 \), because \( 9 \) is a separate constant, not attached to any variable.

Coefficients appear everywhere quantities scale together. If a single ticket costs 12 dollars, the total cost for \( t \) tickets is \( 12t \), where \( 12 \) is the coefficient. If a car travels at a steady 60 miles per hour, the distance covered after \( h \) hours is \( 60h \), where \( 60 \) is the coefficient describing that steady rate.

Recognizing coefficients quickly, and correctly identifying the invisible \( 1 \), sets you up for success when we start combining and simplifying expressions later in this chapter.

## Term

A term is a single number, a single variable, or a product of numbers and variables multiplied together, with no addition or subtraction inside it. Terms are the individual pieces that get added or subtracted to build a larger expression.

In the expression \( 3x + 5 \), there are two terms: \( 3x \) and \( 5 \). The plus sign separates them into distinct pieces. In the expression \( 4x^2 - 2x + 7 \), there are three terms: \( 4x^2 \), \( -2x \), and \( 7 \). Notice that the sign directly in front of a term — plus or minus — travels with that term and is considered part of it.

A single term can contain several pieces multiplied together, but never an addition or subtraction inside the term itself. For example, \( 5xy \) is one term, even though it involves two variables, because \( 5 \), \( x \), and \( y \) are all multiplied, not added. Likewise, \( 6x^2 \) is a single term, because the coefficient \( 6 \) is simply multiplied by \( x \) raised to a power, with no addition breaking it apart.

| Term | Coefficient | Variable Part | Constant? |
|---|---|---|---|
| \( 6x \) | 6 | \( x \) | No |
| \( -2y \) | -2 | \( y \) | No |
| \( 9 \) | — | none | Yes |
| \( \frac{1}{3}n \) | \( \frac{1}{3} \) | \( n \) | No |

Every term you will encounter in this course is built from the pieces we have already met in this chapter: numbers, variables, coefficients, and constants. A term with a variable part combines a coefficient and a variable, while a term with no variable part is simply a constant standing alone.

Counting the terms in a longer expression takes practice, because the plus and minus signs are the only clue separating one term from the next. Consider \( 5x^2 - 3x + 2x - 8 \). Reading from left to right and treating each sign as attached to the term that follows it, this expression contains four terms: \( 5x^2 \), \( -3x \), \( 2x \), and \( -8 \). Two of those terms, \( -3x \) and \( 2x \), happen to share the same variable part, which is exactly the situation we will learn to simplify later in this chapter when we study like terms.

Learning to spot where one term ends and the next begins — by looking for the plus and minus signs between them — is one of the most important reading skills in algebra, and it prepares us directly for our next concept: the expression. A term never appears on its own in isolation for very long; instead, terms are almost always joined together with other terms to build something larger, which is exactly the idea we turn to next.

## Expression

An expression is a combination of one or more terms joined together using operations like addition, subtraction, multiplication, or division, but without an equals sign. An expression represents a value, but unlike an equation, it never claims that value is equal to anything specific.

For example, \( 3x + 5 \) is an expression. So is \( 2(a + b) - 7 \), and so is the single term \( 9 \) all by itself, since a lone number or a lone variable can also count as the simplest possible expression. What all expressions share is that they describe a quantity without asserting a relationship of equality or comparison — they simply say "here is a value, built from these pieces."

Expressions can be simple, involving just one or two terms, or they can be more complex, involving grouping symbols like parentheses, multiple variables, or nested operations. Regardless of complexity, an expression is always something you can simplify or evaluate, but never something you "solve," because there is no equals sign presenting a statement to be made true.

Because an expression can be built from any combination of numbers, variables, coefficients, and terms, it can look very different from one problem to the next while still following the same basic rule. What ties every one of the examples below together is that none of them make a claim of equality — they simply describe a value.

- A single number, like \( 9 \).
- A single variable, like \( x \).
- A short combination, like \( 3x + 5 \).
- A longer combination involving several terms and grouping symbols, like \( 4(x - 2) + 3x^2 - 7 \).

Consider a few everyday situations expressions can describe:

- The total cost of buying \( n \) notebooks at 3 dollars each, plus a 2 dollar shipping fee, is the expression \( 3n + 2 \).
- The perimeter of a rectangle with length \( l \) and width \( w \) can be written as the expression \( 2l + 2w \).
- Someone's age three years from now, if their current age is \( a \), is the expression \( a + 3 \).

Each of these expressions represents a quantity that depends on the value of its variable. Once we know a specific value for \( n \), \( l \) and \( w \), or \( a \), we can evaluate the expression to get a specific number — a skill we will practice closely later in this chapter. For now, the key idea is that an expression is a mathematical phrase, not a mathematical sentence: it names a value without declaring anything equal to it.

Two expressions can look completely different and still describe the same quantity in different ways, much like "twelve" and "a dozen" describe the same amount using different words. Recognizing an expression as a self-contained mathematical phrase, built from the terms, coefficients, variables, and constants introduced earlier in this chapter, prepares us for the next idea: what happens when we place two expressions on either side of an equals sign.

## Equation

An equation is a mathematical statement that says two expressions are equal to each other, connected by an equals sign, \( = \). While an expression is like a phrase, an equation is like a complete sentence — it makes a claim that can be either true or false.

Consider \( 2x + 3 = 11 \). The left side, \( 2x + 3 \), is an expression, and the right side, \( 11 \), is also an expression (in this case, a very simple one). The equals sign in between asserts that these two expressions have the same value. This particular equation is only true when \( x = 4 \), since \( 2(4) + 3 = 11 \). For every other value of \( x \), the equation is false.

<details markdown="1">
#### Diagram: Anatomy of an Equation
A simple horizontal layout showing the equation \( 2x + 3 = 11 \) split into three labeled parts: a box around \( 2x + 3 \) labeled "left side (an expression)," the equals sign in the middle labeled "asserts equality," and a box around \( 11 \) labeled "right side (an expression)." An arrow beneath the whole equation notes that the entire equation, taken together, is a statement that can be true or false depending on the value chosen for \( x \).
</details>

!!! mascot-thinking "Expression or equation?"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    How can you quickly tell an expression apart from an equation? Look for the equals sign. If there is no equals sign, you have an expression — a value waiting to be simplified or evaluated. If there is an equals sign, you have an equation — a claim that two expressions are equal, which is either true or false depending on the value of the variable involved.

Equations are one of the most powerful tools in all of mathematics because they let us describe a relationship and then work backward to discover an unknown value. When we "solve" an equation, we are finding every value of the variable that makes the equation a true statement. Some equations, like \( 2x + 3 = 11 \), have exactly one solution. Others may have no solution at all, or infinitely many solutions, depending on how the two sides are built.

Equations appear constantly in real situations: a recipe that must total a certain number of servings, a budget that must balance to exactly zero, or a distance formula that must equal a specific number of miles. In every case, the equals sign is the heart of the statement — it is the single symbol that turns two separate expressions into one meaningful, checkable claim.

Once a possible solution is found, it can always be checked by substituting it back into the original equation and confirming that both sides still balance. For \( 2x + 3 = 11 \), substituting \( x = 4 \) back in gives \( 2(4) + 3 \), which simplifies to \( 11 \), matching the right side exactly and confirming the solution is correct. This checking habit — substitute, simplify, and compare both sides — will serve you well throughout every equation you meet for the rest of this course.

## Inequality

An inequality is a mathematical statement that compares two expressions using a symbol other than equals, showing that one side is greater than, less than, or otherwise not equal to the other side. While an equation claims two expressions have exactly the same value, an inequality claims a relationship of order or difference between them.

There are five common inequality symbols used in algebra.

| Symbol | Meaning | Example |
|---|---|---|
| \( < \) | less than | \( x < 5 \) |
| \( > \) | greater than | \( x > 5 \) |
| \( \le \) | less than or equal to | \( x \le 5 \) |
| \( \ge \) | greater than or equal to | \( x \ge 5 \) |
| \( \ne \) | not equal to | \( x \ne 5 \) |

Consider the inequality \( x + 3 < 10 \). This statement is true for many different values of \( x \) — for instance, \( x = 2 \) works, since \( 2 + 3 = 5 \), and \( 5 \) is indeed less than \( 10 \). So does \( x = 6 \), and so does \( x = 0 \). Unlike most equations, which tend to have one specific solution, an inequality very often describes an entire range of values that all make the statement true.

Inequalities describe real-world limits and boundaries constantly. A roller coaster might require riders to be taller than 48 inches, written as \( h > 48 \). A budget might require total spending to stay less than or equal to 200 dollars, written as \( s \le 200 \). A speed limit sign describes every legal speed as less than or equal to the posted number.

Because both the strict symbols (\( < \) and \( > \)) and the "or equal to" symbols (\( \le \) and \( \ge \)) show up so often, it helps to notice the small difference in meaning between them. Writing \( x < 5 \) means 5 itself is not included among the solutions, while writing \( x \le 5 \) means 5 is included as a valid solution alongside every number less than it. That single extra line under the symbol changes whether the boundary value itself counts as part of the answer.

Reading an inequality symbol correctly is essential, since reversing a symbol completely changes the meaning of the statement. The symbol always "opens" toward the larger quantity and "points" toward the smaller one, much like an arrow. With practice, translating between words like "at least," "at most," "no more than," and "fewer than" and their matching inequality symbols becomes second nature, and it is a skill this course will continue building throughout every chapter that follows.

## Order of Operations

The order of operations is the agreed-upon sequence mathematicians use to evaluate expressions that contain more than one operation, ensuring that everyone gets the same answer for the same expression. Without an agreed order, an expression like \( 3 + 4 \times 2 \) could be read two different ways and produce two different answers.

The standard order is often remembered using the acronym PEMDAS: Parentheses first, then Exponents, then Multiplication and Division (working left to right), and finally Addition and Subtraction (working left to right).

!!! mascot-tip "Please Excuse My Dear Aunt Sally"
    ![Sage giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    A classic memory trick for PEMDAS is the sentence "Please Excuse My Dear Aunt Sally." Each first letter matches a step in order: Parentheses, Exponents, Multiplication, Division, Addition, Subtraction. Multiplication and division are actually equal partners done left to right, and so are addition and subtraction — the sentence just helps you remember the four groupings in the right order.

Applying this order to \( 3 + 4 \times 2 \), we perform the multiplication before the addition, giving \( 3 + 8 = 11 \), rather than incorrectly adding first to get \( 14 \). Parentheses always take priority over everything else, so an expression like \( (3 + 4) \times 2 \) is handled differently, giving \( 7 \times 2 = 14 \) instead, simply because the parentheses force the addition to happen first.

This single rule keeps every mathematician, calculator, and computer in agreement about what an expression means, and it underlies nearly every calculation the rest of this chapter asks you to perform. Even a longer expression like \( 5 + 2 \times (3 + 1) \) follows the same steps in order: the parentheses are handled first, giving \( 5 + 2 \times 4 \), then the multiplication, giving \( 5 + 8 \), and finally the addition, giving \( 13 \).

## Evaluating Expressions

Evaluating an expression means finding its single numerical value by replacing every variable with a specific number and then carefully applying the order of operations to compute the result. Evaluation turns a general expression into one concrete answer, and it is one of the most common tasks in all of algebra, since a formula is only useful once real numbers have been plugged in.

Suppose we want to evaluate the expression \( 3x + 5 \) when \( x = 4 \). We replace \( x \) with \( 4 \), giving \( 3(4) + 5 \). Following the order of operations, we multiply first, \( 3(4) = 12 \), and then add, \( 12 + 5 = 17 \). So the expression \( 3x + 5 \) evaluates to \( 17 \) when \( x = 4 \).

Evaluating an expression with more than one variable follows exactly the same idea, just with more replacing to do. To evaluate \( 2a + 3b \) when \( a = 5 \) and \( b = 2 \), we replace both letters with their given values at the same time, giving \( 2(5) + 3(2) \), which becomes \( 10 + 6 = 16 \) once the order of operations is applied. Every variable in the expression must be replaced before any arithmetic begins, and mixing up which number belongs to which letter is one of the easiest mistakes to make, so it helps to write each substitution down clearly before calculating.

Evaluating expressions generally follows three clear steps.

1. Identify the value given for each variable in the expression.
2. Replace every occurrence of that variable with its given value, usually placing the number in parentheses to keep the expression clear.
3. Apply the order of operations carefully, working through parentheses, exponents, multiplication and division, and finally addition and subtraction.

The same expression can evaluate to many different results depending on which value is used for its variable. The expression \( 2x^2 - 3 \) evaluates to \( 5 \) when \( x = 2 \), since \( 2(2)^2 - 3 = 2(4) - 3 = 8 - 3 = 5 \), but it evaluates to \( 15 \) when \( x = 3 \), since \( 2(3)^2 - 3 = 2(9) - 3 = 18 - 3 = 15 \). This is exactly why variables are so useful: the same expression can model many different specific outcomes just by changing the number substituted in for the variable, a process we will look at even more closely next.

## Substitution

Substitution is the act of replacing a variable in an expression or equation with a specific numerical value. Substitution is the very first step of evaluating an expression, and it is also a technique used constantly throughout algebra whenever a variable's value becomes known.

For example, if we are told that \( x = 6 \) and asked about the expression \( x + 9 \), substitution means we rewrite the expression as \( 6 + 9 \), replacing the letter with the number we were given. From there, ordinary arithmetic finishes the job, giving a value of \( 15 \).

Substitution becomes especially useful when a variable appears more than once in the same expression. Consider \( x^2 + 2x + 1 \) with \( x = 3 \). Substitution requires replacing every single \( x \) with \( 3 \), not just the first one: \( (3)^2 + 2(3) + 1 \). Missing even one occurrence of the variable is one of the most common substitution errors, so it helps to circle or highlight every place the variable appears before replacing any of them.

Substitution also works with formulas that involve more than one variable. In the area formula \( A = lw \), substituting \( l = 5 \) and \( w = 3 \) gives \( A = (5)(3) = 15 \). Whether an expression has one variable or several, the substitution process is the same: locate every variable, replace it with its known value using parentheses to stay organized, and then simplify what remains using the order of operations.

| Expression | Substitution | Result |
|---|---|---|
| \( x + 9 \) | \( x = 6 \) | \( 6 + 9 = 15 \) |
| \( x^2 + 2x + 1 \) | \( x = 3 \) | \( (3)^2 + 2(3) + 1 = 16 \) |
| \( A = lw \) | \( l = 5,\ w = 3 \) | \( (5)(3) = 15 \) |

Wrapping each substituted value in parentheses is more than a habit — it protects the meaning of negative numbers during the calculation. If \( x = -2 \) is substituted into \( x^2 \) without parentheses, it is easy to misread the expression and lose the negative sign, giving \( (-2)^2 = 4 \) instead of an incorrect \( -4 \).

## Like Terms

Like terms are terms that share the exact same variable, or combination of variables, raised to the exact same power. Like terms may have different coefficients, but their variable part must match perfectly.

For example, \( 3x \) and \( 7x \) are like terms, since they share the variable part \( x \). However, \( 3x \) and \( 3x^2 \) are not like terms, because their exponents differ.

| Pair of Terms | Like Terms? | Why |
|---|---|---|
| \( 3x \) and \( 7x \) | Yes | Same variable part, \( x \) |
| \( 3x \) and \( 3x^2 \) | No | Different exponents |
| \( 5xy \) and \( 2xy \) | Yes | Same variable part, \( xy \) |

Constants are also considered like terms with one another, since they all share the property of having no variable part at all. This means \( 9 \) and \( -4 \) are like terms, even though neither one has a letter attached.

The order of the variables inside a term does not matter when checking for like terms — only which variables are present and their powers. For instance, \( 4xy \) and \( 9yx \) are like terms, since both involve one \( x \) and one \( y \).

Recognizing like terms is a skill built directly from earlier concepts in this chapter — you must be able to identify the variable part of a term and compare it carefully against another term's variable part. This recognition skill is the essential first step before we can combine like terms together, which is exactly where we turn next.

## Combining Like Terms

Combining like terms is the process of adding or subtracting the coefficients of like terms to rewrite an expression with fewer, simpler terms. Because like terms share the same variable part, we can treat that shared variable part like a common unit and simply combine the numbers in front of it.

Consider the expression \( 3x + 5x \). Since \( 3x \) and \( 5x \) are like terms, we add their coefficients, \( 3 + 5 = 8 \), keeping the shared variable part unchanged, to get \( 8x \). The same idea applies with subtraction: \( 9y - 4y \) combines to \( 5y \), since \( 9 - 4 = 5 \).

| Expression | Combined Result |
|---|---|
| \( 3x + 5x \) | \( 8x \) |
| \( 9y - 4y \) | \( 5y \) |

Combining like terms becomes more involved when an expression mixes several different variable parts together. Take the expression \( 4y - 2x + 3y + 7 \). Here, \( 4y \) and \( 3y \) are like terms, combining to \( 7y \), but \( -2x \) and \( 7 \) each stand alone, since nothing else in the expression matches their variable parts. The fully combined expression becomes \( 7y - 2x + 7 \).

Longer expressions simply mean more groups to sort. Consider \( 6x^2 + 3x - 2x^2 - x + 5 - 2 \). Sorting by variable part, \( 6x^2 \) and \( -2x^2 \) form one group, \( 3x \) and \( -x \) form a second group, and \( 5 \) and \( -2 \) form a third group made of constants. Combining within each group gives \( 4x^2 \), \( 2x \), and \( 3 \), so the fully simplified expression is \( 4x^2 + 2x + 3 \).

A reliable process for combining like terms includes the following steps.

1. Identify every term in the expression, paying close attention to the sign in front of each one.
2. Sort the terms into groups based on matching variable parts, keeping constants together as their own group.
3. Add or subtract the coefficients within each group, leaving the shared variable part unchanged.
4. Rewrite the expression using the newly combined terms.

It can help to underline or color-code each group of like terms before combining anything, especially in a longer expression where terms of different variable parts are scattered out of order. Once every group is clearly marked, combining the coefficients within each group becomes a simple arithmetic step rather than a source of confusion.

Combining like terms does not change the value an expression represents — it only rewrites that expression in a shorter, more manageable form. Two expressions that look different on the page, such as \( 3x + 2 + 5x \) and \( 8x + 2 \), represent exactly the same value for every possible value of \( x \), because combining like terms never changes what an expression is actually worth. This makes combining like terms one of the most frequently used skills in algebra, since a simplified expression is easier to evaluate, easier to substitute into, and easier to work with inside a larger equation or inequality.

## Simplifying Expressions

Simplifying an expression means rewriting it in its most compact, equivalent form by applying tools like the order of operations and combining like terms. A simplified expression represents the exact same value as the original, just with fewer terms and less clutter.

For example, the expression \( 4x + 3 + 2x - 1 \) simplifies to \( 6x + 2 \) once the like terms \( 4x \) and \( 2x \) are combined, and the constants \( 3 \) and \( -1 \) are combined. Simplifying is often the very first move algebra students make before evaluating, substituting into, or solving anything further, since a shorter expression with fewer terms is always easier to work with correctly. A simplified expression is not a different expression at all — it is simply the clearest, shortest way of writing the exact same value.

## Expanding Expressions

Expanding an expression means removing parentheses by multiplying a factor across every term inside the grouping symbol, a process based on the distributive property. Expanding is essentially the reverse of grouping terms together with parentheses in the first place.

For example, \( 3(x + 4) \) expands to \( 3x + 12 \), since the \( 3 \) outside the parentheses multiplies both the \( x \) and the \( 4 \) inside. The same idea applies with a negative factor: \( -2(x - 5) \) expands to \( -2x + 10 \), since \( -2 \) multiplied by \( -5 \) produces a positive result.

Once expanded, an expression is often ready to be simplified further by combining any like terms that result, as in \( 2(x + 3) + 4x \), which expands to \( 2x + 6 + 4x \) and then simplifies to \( 6x + 6 \).

## Monomial

A monomial is an expression that consists of exactly one term — a single number, a single variable, or a product of numbers and variables with whole-number exponents. Because a monomial is built from just one term, it never contains any addition or subtraction within it.

Examples of monomials include \( 7 \), \( x \), \( 5x^2 \), and \( -3xy \). Each of these is a single term with no plus or minus sign breaking it into separate pieces.

| Expression | Monomial? | Why |
|---|---|---|
| \( 7 \) | Yes | A single constant |
| \( 5x^2 \) | Yes | A single term |
| \( x + 3 \) | No | Two terms, separated by \( + \) |
| \( 4x - 2x^2 \) | No | Two terms, separated by \( - \) |

The word "monomial" comes from combining "mono," meaning one, with a root related to terms — a helpful reminder that a monomial is always a single term standing alone. Every monomial you will meet in this course is built from the same familiar pieces introduced earlier in this chapter: a coefficient, a variable part, or both multiplied together.

Monomials are the simplest possible category of algebraic expression, but they show up constantly as the individual building blocks inside larger, multi-term expressions. Every term inside a longer expression, once separated out by its plus or minus sign, is itself a monomial standing on its own.

Recognizing a monomial on sight — by checking that it has no addition or subtraction inside it — is a quick, useful check as you continue identifying terms throughout the rest of this course. It also gives you a precise word to reach for whenever you want to describe a single piece of a larger expression without needing to say "the term" over and over again.

## Prime Factorization

Prime factorization is the process of writing a whole number as a product of only prime numbers — numbers greater than 1 whose only factors are 1 and themselves. Every whole number greater than 1 has exactly one prime factorization, no matter which order the factors are found in.

For example, the prime factorization of \( 12 \) is \( 2 \times 2 \times 3 \), since breaking \( 12 \) down repeatedly into smaller factors eventually leaves only prime numbers. A quick way to find it is to divide by the smallest prime that fits, again and again: \( 12 \div 2 = 6 \), then \( 6 \div 2 = 3 \), and \( 3 \) is already prime, leaving \( 2 \times 2 \times 3 \).

Prime factorization is a tool algebra reuses later on for simplifying fractions and factoring expressions, so building comfort with it now pays off throughout the rest of this course.

---

!!! mascot-celebration "Great work!"
    ![Sage celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You made it through the foundations of algebra! You can now recognize numbers, variables, constants, and coefficients, and you can build them into terms, expressions, equations, and inequalities. You know how to apply the order of operations, evaluate and substitute into expressions, and combine like terms to simplify your work. Let's figure this out together in every chapter still to come — this vocabulary will show up again and again.

---
## Word Count Report

| Concept | Approx. Words Written | Target |
|---|---|---|
| Number | 714 | 727 |
| Variable | 632 | 631 |
| Constant | 324 | 302 |
| Coefficient | 373 | 390 |
| Term | 495 | 502 |
| Expression | 521 | 502 |
| Equation | 537 | 542 |
| Inequality | 475 | 502 |
| Order of Operations | 317 | 302 |
| Evaluating Expressions | 428 | 453 |
| Substitution | 401 | 390 |
| Like Terms | 280 | 302 |
| Combining Like Terms | 544 | 502 |
| Simplifying Expressions | 143 | 150 |
| Expanding Expressions | 152 | 150 |
| Monomial | 315 | 302 |
| Prime Factorization | 158 | 150 |
| **Total** | **6809** | **6800** |
