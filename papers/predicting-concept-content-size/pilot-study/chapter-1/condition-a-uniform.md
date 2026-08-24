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
    Let's figure this out! In this chapter, we'll open the toolbox of algebra together. You already know how to add, subtract, multiply, and divide numbers — now we'll learn a new language that uses letters, symbols, and numbers to describe patterns and solve problems. By the end of this chapter, you'll be reading and writing algebraic expressions with confidence.

## The Vocabulary of Algebra

### Number

Algebra begins with something you already know well: numbers. A **number** is a mathematical object that represents a quantity, position, or measurement. In arithmetic, you have used numbers to count objects, measure lengths, and calculate totals. In algebra, numbers continue to play this role, but they now work alongside letters and symbols to describe patterns that hold true across many situations at once rather than just one specific case. Understanding the different kinds of numbers you will encounter is the first step toward building the kind of algebraic fluency this course is designed to develop.

Mathematicians sort numbers into groups, and knowing these groups helps you decide what kind of answer makes sense for a given problem. The counting numbers \(1, 2, 3, \ldots\) are called natural numbers, the numbers you likely learned first as a small child. Adding zero to that list produces the whole numbers. Whole numbers together with their negative opposites form the integers, such as \(-5\), \(-1\), \(0\), \(4\), and \(12\). Numbers that can be written as a fraction of two integers, like \(\frac{3}{4}\) or \(-2.5\), are called rational numbers. Numbers such as \(\pi\) or \(\sqrt{2}\), which never terminate or repeat as decimals no matter how far you calculate them, are called irrational numbers.

- Natural numbers: \(1, 2, 3, 4, \ldots\), the numbers used for basic counting
- Whole numbers: \(0, 1, 2, 3, \ldots\), the natural numbers plus zero
- Integers: \(\ldots, -2, -1, 0, 1, 2, \ldots\), whole numbers and their negative opposites
- Rational numbers: any number that can be written as \(\frac{a}{b}\), where \(a\) and \(b\) are integers and \(b \neq 0\)
- Irrational numbers: numbers like \(\pi\) and \(\sqrt{2}\) that cannot be written as an exact fraction

All of these number types can be placed on a number line, a horizontal line on which every point corresponds to a number, with values increasing from left to right and decreasing from right to left. The number line gives you a visual way to compare numbers, put them in order, and measure the distance between two values, which becomes especially useful once negative numbers enter the picture. A temperature of \(-10\) degrees, for instance, sits well to the left of zero, while an elevation of \(500\) feet above sea level sits far to the right.

In algebra, numbers appear constantly — as the values substituted for letters, as the amounts attached to those letters, and as the results of calculations. Most problems in this course draw on integers and rational numbers, since quantities like money, distance, and temperature are naturally described using them. Recognizing what kind of number you are working with will help you decide whether an answer makes sense before you even check it.

### Variable

A **variable** is a letter or symbol used to represent a number that is unknown, changing, or general. Common variable letters include \(x\), \(y\), \(n\), and \(t\), although any letter can serve as a variable, and the choice of letter is often meant to remind us what it stands for, such as \(t\) for time. Variables let mathematicians write statements that apply to many situations at once instead of describing just one specific number. Instead of writing a separate sentence for every possible price, for example, we can write one expression using a variable that stands for "the price," whatever that price turns out to be.

Variables serve two closely related purposes in algebra. Sometimes a variable represents an unknown value that we want to solve for, such as the number of miles \(m\) a car can travel on one tank of gas before running out. Other times, a variable represents a quantity that naturally varies from one situation to the next, such as a person's age over time or the temperature outside during the day. If Maya is currently \(y\) years old, then her age in five years can be written as \(y + 5\) — the expression stays useful no matter what number \(y\) actually is, whether Maya is seven or seventeen.

!!! mascot-thinking "Why not just use a blank space instead of a letter?"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Let's figure this out! A blank space can only hold one answer at a time, but a variable can be reused throughout a whole calculation and can represent different values in different problems. Using a consistent letter, like \(x\), lets us track the same unknown quantity across several steps of reasoning, and even use it again in a completely different problem later.

Variables are what give algebra its power. A formula such as \(A = \ell w\), which calculates the area of a rectangle from its length \(\ell\) and width \(w\), works for every rectangle that has ever existed or ever will, because the letters stand in for whatever specific numbers apply to the rectangle in front of you. This is very different from arithmetic, where a statement like \(4 \times 3 = 12\) only ever describes that one pair of numbers. Learning to read variables comfortably — to see \(x\) not as a mystery to be afraid of but as a placeholder patiently waiting for a value — is one of the most important shifts in thinking that algebra asks you to make, and it is a shift that gets easier with every problem you practice.

### Constant

A **constant** is a term whose value never changes; it is a fixed number that appears in an expression on its own, without a variable attached to it. Constants stand in direct contrast to variables, which can represent different values depending on the situation being described. In the expression \(3x + 5\), the number \(5\) is a constant because it always contributes the same fixed amount to the total, no matter what value \(x\) happens to take on in a particular problem.

Constants show up throughout mathematics and science, often as familiar, fixed numbers found inside formulas. The number \(\pi\), approximately \(3.14159\), is a constant used whenever we work with circles, and it never changes no matter which circle you are measuring. In physics, the speed of light and the freezing point of water are both examples of constants borrowed from the real world. Closer to a typical algebra classroom, if a plumber charges a flat forty-dollar visit fee plus an hourly rate, the forty dollars is a constant added on top of whatever the hourly charges come out to be.

| Expression | Constant term | Why it is constant |
|---|---|---|
| \(2x + 7\) | \(7\) | Always adds exactly 7, regardless of what \(x\) is |
| \(9 - n\) | \(9\) | Fixed starting value before subtracting \(n\) |
| \(\pi r^2\) | \(\pi\) | A fixed number, approximately 3.14159, that never changes |
| \(40 + 15h\) | \(40\) | A flat fee that applies no matter how many hours \(h\) are worked |

Recognizing constants matters because they behave differently from variable terms when you simplify or solve. A constant can be combined with other constants through ordinary arithmetic, since two fixed numbers can simply be added or subtracted together. A variable term, on the other hand, needs a matching variable term with the same letter and exponent before it can be combined with anything else, a rule you will study closely later in this chapter under like terms. Learning to spot the constant in an expression at a glance, separate from the terms attached to variables, will make every later skill in this chapter, from combining like terms to solving equations, considerably easier to carry out accurately and quickly.

### Coefficient

A **coefficient** is the number multiplied by a variable in a term. It tells you how many copies of the variable's value are being counted, almost like a multiplier standing in front of the letter. In the term \(7x\), the number \(7\) is the coefficient, meaning the term represents seven copies of whatever \(x\) equals, added together. Coefficients can be positive, negative, whole numbers, or fractions, and they can also be very large or very small depending on the real-world situation a term is describing.

When a variable appears with no number written in front of it, such as in the term \(x\), the coefficient is understood to be \(1\), since \(x\) means exactly the same thing as \(1x\). Similarly, a term like \(-y\) has a coefficient of \(-1\), not simply a "missing" number. Recognizing these invisible coefficients is an important habit, because later skills, like combining like terms, require you to work with the coefficient even when it is not written explicitly in front of the letter. A negative coefficient signals a decrease or an opposite direction, while a coefficient between zero and one, like \(\frac{1}{2}\), signals only a part or fraction of the variable's value.

| Term | Coefficient | Variable part |
|---|---|---|
| \(7x\) | \(7\) | \(x\) |
| \(-3y^2\) | \(-3\) | \(y^2\) |
| \(x\) | \(1\) | \(x\) |
| \(-n\) | \(-1\) | \(n\) |
| \(\frac{2}{3}n\) | \(\frac{2}{3}\) | \(n\) |

Coefficients often carry real-world meaning, representing a rate, a price per item, or a scale factor applied to a quantity. If apples cost \(2\) dollars each, then the cost of buying \(a\) apples is \(2a\), where \(2\) is the coefficient describing the price per apple and \(a\) represents however many apples are purchased. If a recipe is doubled, every ingredient amount is multiplied by the coefficient \(2\); if it is cut in half, every amount is multiplied by \(\frac{1}{2}\). Understanding coefficients as answering the question "how many" or "how much per unit" makes algebraic expressions feel far less abstract and much more like a shorthand for everyday situations you already reason about without even realizing it.

### Term

A **term** is a single number, a single variable, or numbers and variables multiplied together, and it forms one of the building blocks separated by addition or subtraction within a larger expression. For example, in \(4x^2\), the entire quantity is one term, formed by multiplying the coefficient \(4\) by the variable \(x\) raised to the second power. A lone number like \(9\) is also a term on its own, and so is a lone variable like \(y\), even without any coefficient or exponent attached to it.

Terms combine to build larger expressions, much like words combine to build sentences. In the expression \(5x + 3y - 8\), there are three terms: \(5x\), \(3y\), and \(-8\). Notice that the sign directly in front of a term, plus or minus, travels along with that term wherever it goes; the third term here is negative eight, not simply eight with a separate subtraction happening beside it. Learning to see the plus and minus signs as attached to the term that immediately follows them, rather than as separate operations floating in between numbers, is one of the most useful reading habits you can build early in algebra.

- A term made of a number alone, such as \(12\), is sometimes called a constant term.
- A term made of a coefficient and one variable, such as \(6x\), is a single-variable term.
- A term can include more than one variable multiplied together, such as \(4xy\), which combines two different letters.
- A term never contains a plus or minus sign inside it; those symbols separate one term from the next term in the expression.

Every term has parts worth naming and identifying on sight: a coefficient, which is the numerical factor; a variable part, made up of the letters; and, when present, exponents describing how many times the variable is multiplied by itself. The sum of the exponents in a term is sometimes called the degree of that term, a detail that becomes more important once expressions grow longer and more complex. Being able to break any term into these pieces prepares you well for the next concept, the expression, which is simply a collection of one or more terms joined together by addition or subtraction.

### Expression

An **expression** is a combination of numbers, variables, and operation symbols that represents a value, but it does not contain an equals sign and therefore does not make a claim that two things are equal. Expressions can be as short as a single term, like \(9\) or \(x\), or as long as needed, joining many terms together with addition and subtraction, such as \(4x^2 - 3x + 7\), which combines three separate terms into one longer expression.

<details markdown="1">
#### Diagram: Anatomy of an Expression
This diagram would show the expression \(4x^2 - 3x + 7\) with labeled arrows pointing to its three parts. An arrow to \(4x^2\) would be labeled "term with coefficient 4 and variable x squared." An arrow to \(-3x\) would be labeled "term with coefficient -3, sign attached to the term." An arrow to \(7\) would be labeled "constant term." A bracket beneath the whole expression would read "expression: terms joined by addition and subtraction, no equals sign."
</details>

Think of an expression as a mathematical phrase rather than a complete sentence. Just as the phrase "the number of students in the room" describes a quantity without asserting anything about it, the expression \(x + 5\) describes a quantity — five more than some number \(x\) — without claiming it equals anything in particular. This distinction becomes important in the next section, when we compare expressions to equations and inequalities, which do make claims by connecting two expressions with a symbol like \(=\), \(<\), or \(>\), turning a phrase into a full sentence.

Expressions are useful precisely because they let us describe relationships and quantities in a compact, reusable form that does not depend on any one specific number. A store might use the expression \(15h\) to represent the earnings of an employee who works \(h\) hours at fifteen dollars per hour; the same expression works whether \(h\) turns out to be \(4\), \(20\), or \(38.5\). A phone plan might use the expression \(30 + 0.10t\) to represent a monthly bill with a flat base cost plus a per-text charge. Learning to build, read, and eventually simplify expressions like these is the central skill this entire chapter is building toward, and every remaining concept in this chapter connects back to it in some way.

## Mathematical Statements

### Equation

An **equation** is a mathematical statement that two expressions are equal, joined by an equals sign, \(=\). While an expression is simply a phrase describing a quantity, an equation is a complete sentence making a claim — it says that whatever is on the left side has the exact same value as whatever is on the right side. The equation \(x + 4 = 10\) claims that some number \(x\), when increased by four, produces exactly ten.

Every equation has two sides, and both sides are themselves expressions, built from the same terms, variables, and constants you have already learned to identify. In \(3x - 2 = 13\), the left side is the expression \(3x - 2\) and the right side is the expression \(13\). Solving an equation means finding the value or values of the variable that make the equation a true statement rather than a false one. For \(x + 4 = 10\), the value \(x = 6\) makes the statement true, since \(6 + 4\) does equal \(10\); any other value, such as \(x = 5\) or \(x = 7\), would make the statement false when checked.

- An equation always contains an equals sign; an expression never does.
- Both sides of an equation must represent the same value for the equation to be considered true.
- A value that makes an equation true is called a solution to that equation.
- Equations can involve one variable, several variables, or no variables at all, such as the true numerical statement \(2 + 2 = 4\).

Equations appear whenever we need to describe a balance between two quantities: a recipe that must use exactly a certain number of cups, a budget that must add up to a set total, or a formula relating distance, rate, and time so that both sides always agree. You will spend much of this course learning systematic methods for solving equations, but even now, before those methods are introduced, you can already check whether a given number is a solution simply by substituting it in and confirming both sides come out equal. Recognizing an equation by its equals sign, and understanding that it makes a claim about equality rather than merely describing a quantity, prepares you for everything that follows in later chapters.

### Inequality

An **inequality** is a mathematical statement that compares two expressions using a symbol other than an equals sign, showing that one side is greater than, less than, or not equal to the other. Where an equation claims two expressions are exactly equal, an inequality claims a relationship of difference between them, and that relationship can still be perfectly precise even though the two sides are not equal. The statement \(x > 5\) claims that whatever number \(x\) represents, it must be greater than five, no other requirement attached.

Several symbols are used to write inequalities, and each has a precise meaning that must be read carefully from left to right, in the same order the symbols appear on the page.

| Symbol | Meaning | Example | Read as |
|---|---|---|---|
| \(>\) | greater than | \(x > 3\) | \(x\) is greater than 3 |
| \(<\) | less than | \(x < 3\) | \(x\) is less than 3 |
| \(\geq\) | greater than or equal to | \(x \geq 3\) | \(x\) is at least 3 |
| \(\leq\) | less than or equal to | \(x \leq 3\) | \(x\) is at most 3 |
| \(\neq\) | not equal to | \(x \neq 3\) | \(x\) is not 3 |

Unlike an equation, which usually has exactly one solution or a small set of solutions, an inequality is often true for a whole range of values rather than a single number. The inequality \(x > 5\) is true for \(x = 6\), for \(x = 100\), and for \(x = 5.001\), so its solution is an entire range of numbers rather than one exact value. This range can be pictured on a number line as a shaded region, often starting from a specific boundary value and extending in one direction, sometimes with an open circle to show a boundary that is not included in the solution and a closed circle to show one that is included.

Inequalities describe real limits and requirements that show up constantly outside the classroom: a roller coaster might require riders to be at least \(48\) inches tall, written \(h \geq 48\), or a shipping box might need to weigh less than \(20\) pounds, written \(w < 20\), to qualify for standard shipping rates. Learning to translate everyday requirements like these into inequality symbols, and to read inequality symbols back into plain English, is a skill you will continue building throughout the rest of this algebra course.

## Order of Operations and Evaluating Expressions

### Order of Operations

The **order of operations** is the agreed-upon sequence of steps mathematicians follow when an expression contains more than one operation, ensuring that everyone who evaluates the same expression arrives at the exact same answer. Without a shared order, an expression like \(2 + 3 \times 4\) could be read two different ways: adding first would give \(20\), while multiplying first would give \(14\). Mathematicians around the world have agreed that multiplication happens before addition, so the correct, universally accepted value is \(14\).

The order of operations is often remembered using the acronym PEMDAS: Parentheses, Exponents, Multiplication and Division, Addition and Subtraction. Multiplication and division are performed together, from left to right, in whichever order they appear in the expression; the same left-to-right rule is true for addition and subtraction. This detail trips many students up, because PEMDAS looks like it lists six separate steps when it actually describes only four stages, two of which are performed together.

!!! mascot-tip "A helpful way to remember PEMDAS"
    ![Sage sharing a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Let's figure this out! Many students remember the order using the phrase "Please Excuse My Dear Aunt Sally." Just remember that the M and D happen together as one single step, working left to right across the expression, and the A and S happen together as another step, also working left to right — they are not two completely separate stages performed in strict alphabetical order.

- **P**arentheses: work out anything grouped inside parentheses or brackets first, from the innermost group outward.
- **E**xponents: calculate any powers next, once all grouped quantities have been simplified.
- **M**ultiplication and **D**ivision: perform these together, moving left to right across the expression.
- **A**ddition and **S**ubtraction: perform these together, moving left to right across the expression.

Consider the expression \(3 + 2 \times (5 - 1)^2\). Following the order of operations, we first evaluate the parentheses to get \(5 - 1 = 4\), then apply the exponent to get \(4^2 = 16\), then multiply to get \(2 \times 16 = 32\), and finally add to get \(3 + 32 = 35\). Skipping a step or performing the steps out of order, such as adding \(3\) and \(2\) before dealing with the parentheses, produces a different and incorrect result, which is exactly why a consistent, universally shared order of operations matters so much in algebra and in every calculator or computer built to evaluate math.

### Evaluating Expressions

**Evaluating an expression** means finding its single numerical value by replacing every variable with a given number and then carrying out the remaining arithmetic using the order of operations you just studied. Evaluation turns an abstract expression, which can represent many possible values depending on what is substituted, into one concrete number tied to a specific situation. Given the expression \(3x + 7\), evaluating it when \(x = 4\) means calculating \(3(4) + 7\), which equals \(19\).

The process of evaluating an expression always follows the same two-stage pattern: first, replace each variable with its given value, being careful to keep track of parentheses around negative numbers or fractions; second, apply the order of operations to the resulting purely numerical expression until a single number remains at the end. For the expression \(2x^2 - 5\) evaluated at \(x = -3\), the steps unfold as \(2(-3)^2 - 5\), then \(2(9) - 5\) once the exponent is applied, then \(18 - 5\) once the multiplication is done, giving a final value of \(13\).

- Write down the original expression exactly as given, before making any changes.
- Replace every variable with the value provided, enclosing negative or fractional values in parentheses.
- Apply the order of operations, working through parentheses, exponents, multiplication and division, then addition and subtraction.
- State the final numerical answer clearly, including any units the problem calls for.

Evaluating expressions is how algebra connects back to concrete, checkable answers in the real world. A formula for the perimeter of a rectangle, \(P = 2\ell + 2w\), is only an abstract pattern until specific measurements are evaluated into it; substituting \(\ell = 6\) and \(w = 3\) evaluates the expression to \(P = 18\). Every time you check whether a value solves an equation, calculate a real-world quantity from a formula, or verify a single step in a longer algebraic process, you are evaluating an expression, which makes this one of the most frequently practiced skills in all of algebra, appearing again in nearly every chapter that follows this one.

### Substitution

**Substitution** is the specific act of replacing a variable in an expression or equation with a given numerical value, and it is the essential first step in evaluating any expression that contains a variable. While evaluating describes the entire process of finding a numeric answer, substitution refers more narrowly to the exact moment when a letter is swapped out for a number. Careful substitution sets up every later calculation to succeed, while careless substitution is the most common source of small errors in early algebra work, especially once negative numbers and exponents are involved together in the same term.

When substituting, it is important to place the value being substituted inside parentheses, especially when that value is negative or when it will be raised to a power. Substituting \(x = -2\) into the expression \(x^2 - 3x\) should be written as \((-2)^2 - 3(-2)\), not as \(-2^2 - 3-2\), because dropping the parentheses can easily lead to sign errors during the arithmetic that follows, sometimes producing an answer with the wrong sign entirely. Consider also substituting \(x = \frac{1}{2}\) into \(4x + 1\); writing it as \(4\left(\frac{1}{2}\right) + 1\) keeps the fraction clearly grouped and easy to multiply correctly.

- Identify every place the variable appears in the expression, since a variable may appear more than once.
- Replace each occurrence with the given value, enclosed in parentheses.
- Apply the order of operations to simplify the resulting numerical expression from start to finish.
- Double-check the sign and size of the final answer, especially with negative or fractional substitutions.

Substitution is used constantly beyond simple evaluation: to check whether a proposed solution actually satisfies an equation, to test a value in an inequality to see whether it belongs to the solution set, and to plug real measurements into geometric or scientific formulas drawn from everyday life. For instance, checking whether \(x = 3\) solves the equation \(2x + 1 = 7\) is nothing more than substitution: replacing \(x\) with \(3\) gives \(2(3) + 1\), which simplifies to \(7\), confirming the solution. Practicing substitution carefully, one variable at a time and always with parentheses around negative or fractional values, prevents many of the small arithmetic mistakes that can otherwise derail an entire multi-step problem later on.

## Working with Expressions

### Like Terms

**Like terms** are terms that have exactly the same variable or variables, each raised to exactly the same power; only their coefficients may differ from one another. The terms \(3x\) and \(7x\) are like terms because both have the variable \(x\) raised to the first power, even though their coefficients, \(3\) and \(7\), are different numbers. The terms \(2x^2\) and \(2x\), by contrast, are not like terms, because the exponents on \(x\) do not match, even though the variable letter and the coefficient look very similar at a glance.

Identifying like terms correctly is essential, because only like terms can ever be combined into a single term; unlike terms must always be left separate in a simplified expression. Constants are also considered like terms with one another, since a plain number can be thought of as having a variable part of "nothing," or equivalently as a term with an exponent of zero. In the expression \(5x + 3y - 2x + 9\), the terms \(5x\) and \(-2x\) are like terms because they share the variable \(x\) to the first power, while \(3y\) and \(9\) each stand alone in this particular expression, unmatched by any other term of their exact type.

| Pair of terms | Like terms? | Reason |
|---|---|---|
| \(4x\) and \(9x\) | Yes | Same variable, same exponent (1) |
| \(6y^2\) and \(6y\) | No | Exponents differ (2 versus 1) |
| \(3xy\) and \(-8xy\) | Yes | Same variables, same exponents |
| \(7\) and \(12\) | Yes | Both are constant terms |
| \(5x^2y\) and \(-2x^2y\) | Yes | Same two variables, same exponents on each |

!!! mascot-warning "A common mix-up"
    ![Sage warning about a common mistake](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A frequent mistake is treating \(x\) and \(x^2\) as the same kind of term simply because they share a letter. Remember that the exponent is part of what makes terms alike — \(x\) means one copy of \(x\), while \(x^2\) means \(x\) multiplied by itself, an entirely different quantity that cannot be merged with plain \(x\) terms no matter how tempting it looks.

Spotting like terms becomes easier with practice, and it is often helpful to underline or color-code matching terms before combining anything, especially in a longer expression with many terms scattered in different orders.

### Combining Like Terms

**Combining like terms** is the process of adding or subtracting the coefficients of like terms in order to rewrite them as a single, simpler term. Because like terms share the same variable part, only their coefficients need to be combined; the variable part itself stays exactly the same in the result, untouched by the addition or subtraction happening to the numbers in front of it. Combining \(3x\) and \(7x\) gives \(10x\), since \(3 + 7 = 10\) and the variable part \(x\) carries through completely unchanged.

The process works the same way with subtraction and with more than two terms combined at once. To combine \(9y - 4y + 2y\), add the coefficients \(9 - 4 + 2\) together to get \(7\), so the simplified result is \(7y\). When an expression mixes several different kinds of terms, each group of like terms must be combined separately from the others, leaving unlike terms untouched and unchanged in the final answer.

- Scan the expression and sort terms into groups of like terms, including a separate group for plain constants.
- Add or subtract the coefficients within each group, keeping the shared variable part unchanged throughout.
- Rewrite the expression using one term per group, typically ordered from the highest exponent down to the constant term.
- Leave any term with no match from its group exactly as it was in the original expression.

For example, combining like terms in \(5x + 3y - 2x + 9 - 4y\) means grouping \(5x\) with \(-2x\) to get \(3x\), grouping \(3y\) with \(-4y\) to get \(-y\), and leaving the constant \(9\) alone since nothing else matches it, producing the simplified expression \(3x - y + 9\). Notice that the order the terms were originally written in does not matter; like terms can be found and combined no matter how far apart they sit in the expression, as long as every term is checked carefully.

Combining like terms is one of the most frequently used simplification skills in algebra, since it turns long, cluttered expressions into short, manageable ones without ever changing the value the expression represents for any given substitution. It is often compared to sorting a mixed pile of coins before counting them: grouping the quarters with the quarters and the dimes with the dimes makes the total far easier to find than adding everything in a random, jumbled order.

### Simplifying Expressions

**Simplifying an expression** means rewriting it in an equivalent but more compact form, using the fewest and clearest terms possible while keeping its value exactly the same for every possible substitution you might make later. Simplification typically draws on several of the skills already introduced in this chapter working together in sequence: applying the order of operations, combining like terms, and, when parentheses are present, expanding them before any combining can begin.

A fully simplified expression has no like terms left to combine and no unnecessary parentheses remaining anywhere in it. Consider \(4x + 3 - x + 2(x + 1)\). Distributing the \(2\) across the parentheses gives \(4x + 3 - x + 2x + 2\), and then combining like terms — the \(x\)-terms \(4x\), \(-x\), and \(2x\), along with the constants \(3\) and \(2\) — produces the fully simplified result \(5x + 5\), a much shorter expression that behaves identically to the original for every value of \(x\).

- Remove parentheses first, if any are present, by distributing any coefficient sitting in front of them.
- Group together and combine all like terms found throughout the expression.
- Write the final answer with terms typically ordered from the highest exponent down to the constant.
- Check carefully that no further combining is possible before calling the expression fully simplified.

Simplifying expressions matters because a simplified form is easier to evaluate quickly, easier to compare against other expressions, and easier to plug into a larger equation without making mistakes. Two expressions that look very different on the surface, such as \(4x + 3 - x + 2(x + 1)\) and \(5x + 5\), are actually completely equivalent, and simplification is the tool that reveals that hidden equivalence clearly and reliably every time. You can always confirm two expressions are equivalent by substituting the same value into both and checking that the results match; substituting \(x = 2\) into either version above gives \(15\).

Simplification is also a skill you will lean on constantly in later chapters, since solving equations, working with formulas, and factoring polynomials all go more smoothly once an expression has been reduced to its simplest possible form first. Getting into the habit of simplifying before doing anything else with an expression will save time and prevent errors throughout the rest of this course.

### Expanding Expressions

**Expanding an expression** means removing parentheses by multiplying the term outside the parentheses by every single term inside, a process based on the distributive property. The distributive property states that for any numbers or variables \(a\), \(b\), and \(c\), the expression \(a(b + c)\) is equivalent to \(ab + ac\). Expanding \(3(x + 4)\) means multiplying \(3\) by \(x\) and \(3\) by \(4\) separately, giving \(3x + 12\) as the fully expanded result.

!!! mascot-encourage "This step trips a lot of people up at first"
    ![Sage offering encouragement](../../img/mascot/encourage.png){ class="mascot-admonition-img" }
    Let's figure this out! Expanding feels tricky the first few times because you have to multiply the outside term by every single term inside the parentheses, not just the first one you happen to see. If you forget a term, try circling each term inside the parentheses one at a time and drawing an arrow to the outside number before you multiply — it turns an easy-to-miss step into a step you simply cannot skip.

Expanding becomes more involved when the term outside the parentheses is negative or when there are more than two terms inside the parentheses. Expanding \(-2(x - 5)\) means multiplying \(-2\) by \(x\) to get \(-2x\), and \(-2\) by \(-5\) to get \(+10\), so the fully expanded expression is \(-2x + 10\); the negative sign outside the parentheses must be distributed to every single term inside, including flipping the sign of any term that was already negative to begin with. A three-term case like \(4(2x - y + 3)\) works the same way, distributing \(4\) across all three terms to give \(8x - 4y + 12\).

Expanding is often just the first half of a larger simplification task rather than the final answer by itself. In the expression \(4 + 3(2x - 1)\), expanding the parentheses gives \(4 + 6x - 3\), and combining the like terms \(4\) and \(-3\) that remain finishes the job, producing the fully simplified result \(6x + 1\). Mastering expansion alongside combining like terms allows you to simplify almost any expression you will encounter throughout the rest of this course.

## Special Forms

### Monomial

A **monomial** is an algebraic expression made up of exactly one term, formed by multiplying numbers and variables together, where every variable has a whole-number exponent. The expressions \(7\), \(4x\), \(-3x^2y\), and \(x^5\) are all monomials, because in each case there is a single term with no addition or subtraction separating multiple parts. The word "monomial" comes from the prefix "mono," meaning one, which describes an expression built from exactly one term.

An expression with more than one term is not a monomial; instead, an expression with exactly two terms is called a binomial, and an expression with exactly three terms is called a trinomial. Expressions with one or more terms in general are called polynomials, so every monomial is technically a special case of a polynomial, one that happens to have just a single term rather than several.

| Expression | Number of terms | Name |
|---|---|---|
| \(9x\) | 1 | monomial |
| \(4x + 7\) | 2 | binomial |
| \(x^2 - 3x + 5\) | 3 | trinomial |
| \(-6y^3\) | 1 | monomial |
| \(2ab^2\) | 1 | monomial |

Monomials also follow a specific rule about their exponents: valid monomials use only whole-number exponents that are zero or positive, so an expression like \(x^{1/2}\) or \(3x^{-1}\) does not count as a monomial in this strict sense, since those exponents are not whole numbers. The degree of a monomial is found by adding up the exponents of all its variables; the monomial \(2ab^2\) has degree three, since the exponent on \(a\) is one and the exponent on \(b\) is two, and \(1 + 2 = 3\). A plain constant like \(9\) is considered a monomial of degree zero, since it has no variable part at all.

Monomials serve as the basic building blocks from which larger polynomial expressions are constructed, since every polynomial can be viewed as a sum of monomial terms joined by addition or subtraction. Multiplying two monomials together, such as \(3x\) and \(2x^2\), always produces another monomial, in this case \(6x^3\), a pattern you will use often once you begin multiplying polynomials. Recognizing monomials clearly now will make it much easier to classify and work with more complex polynomial expressions in later chapters of this course.

### Prime Factorization

A **prime number** is a whole number greater than \(1\) that has exactly two factors: \(1\) and itself, with no other numbers dividing into it evenly. The numbers \(2\), \(3\), \(5\), \(7\), and \(11\) are all prime, while a number like \(12\) is not prime, because it can be divided evenly by \(1, 2, 3, 4, 6,\) and \(12\), giving it far more than two factors. **Prime factorization** is the process of writing a whole number as a product of only its prime factors, breaking it down as completely as it can possibly go.

Prime factorization is often carried out using a factor tree, a diagram that repeatedly splits a number into two smaller factors until every branch ends in a prime number that cannot be split further. Starting with \(60\), one branch might split it into \(6\) and \(10\); the \(6\) then splits into \(2\) and \(3\), and the \(10\) splits into \(2\) and \(5\). Once every branch ends in a prime number, the prime factorization of \(60\) is \(2 \times 2 \times 3 \times 5\), often written more compactly using exponents as \(2^2 \times 3 \times 5\).

<details markdown="1">
#### Diagram: Factor Tree for 60
This diagram would show the number 60 at the top, branching down into 6 and 10. The branch under 6 would split further into 2 and 3, both circled to show they are prime. The branch under 10 would split into 2 and 5, both also circled as prime. A line at the bottom would collect the four circled prime numbers into the product \(2 \times 2 \times 3 \times 5\).
</details>

Every whole number greater than \(1\) has exactly one prime factorization, and no other, a fact so important that it is called the Fundamental Theorem of Arithmetic. Prime factorization is a practical tool, not just a curiosity for its own sake: it is used to find the greatest common factor of two numbers, to reduce fractions to their lowest terms, and, later in algebra, to factor polynomial expressions by recognizing the smaller building blocks hidden inside them. The habit of breaking a number down into its most basic prime pieces, patiently and systematically, will resurface again and again as you continue studying algebra in the chapters that follow this one.

---

!!! mascot-celebration "You did it!"
    ![Sage celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Let's figure this out — and look, we already did! You now know the essential vocabulary of algebra, from numbers and variables all the way to expanding expressions and prime factorization. Every skill in the chapters ahead builds on the foundation you just built. Great work!

---
## Word Count Report

| Concept | Approx. Words Written | Target |
|---|---|---|
| Number | 454 | 400 |
| Variable | 428 | 400 |
| Constant | 377 | 400 |
| Coefficient | 357 | 400 |
| Term | 372 | 400 |
| Expression | 378 | 400 |
| Equation | 381 | 400 |
| Inequality | 418 | 400 |
| Order of Operations | 402 | 400 |
| Evaluating Expressions | 341 | 400 |
| Substitution | 376 | 400 |
| Like Terms | 385 | 400 |
| Combining Like Terms | 397 | 400 |
| Simplifying Expressions | 387 | 400 |
| Expanding Expressions | 349 | 400 |
| Monomial | 379 | 400 |
| Prime Factorization | 379 | 400 |
| **Total** | **6560** | **6800** |
