# Exponential Functions

## Summary

This chapter introduces exponential functions and their applications to real-world growth and decay phenomena. Students will learn to distinguish between exponential growth and decay, understand growth and decay factors, and recognize the role of initial value in exponential models. The chapter includes practical applications such as compound interest and teaches students to compare linear and exponential functions, understanding when each model is appropriate. Students will also learn to graph exponential functions and identify their key characteristics.

## Concepts Covered

1. Exponential Function
2. Exponential Growth
3. Exponential Decay
4. Growth Factor
5. Decay Factor
6. Initial Value
7. Exponential Models
8. Comparing Linear and Exponential
9. Graphing Exponentials
10. Applications of Systems

## Prerequisites

Builds on Chapter 2 (Number Systems and Properties), Chapter 3 (Exponents and Powers), Chapter 8 (Introduction to Functions), Chapter 9 (Graphing and Linear Functions), Chapter 10 (Systems of Equations and Inequalities).

---

!!! mascot-welcome "Welcome!"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Let's figure this out! In this chapter, we will meet a new kind of function — one that multiplies instead of adds. You already know how linear functions climb at a steady rate. Get ready to see what happens when growth speeds up, or slows down, over and over again.

## Exponential Function

In Chapter 9, you graphed linear functions, where equal steps in \( x \) always produce equal *additive* steps in \( y \). Every time \( x \) increases by 1, a linear function's output changes by the same fixed amount — the slope. An **exponential function** behaves differently. It is a function in which the input variable appears in the exponent, and each equal step in \( x \) produces the same *multiplicative* change in \( y \).

The general form of an exponential function is

\[ f(x) = a \cdot b^x \]

where \( a \) is a nonzero constant, \( b \) is a positive constant not equal to 1, and \( x \) is the exponent. Because \( x \) sits in the exponent rather than being multiplied by a coefficient, exponential functions behave very differently from the linear and quadratic functions you have already studied.

Consider \( f(x) = 2^x \). Each time \( x \) increases by 1, the output does not increase by a fixed amount — it doubles:

- \( f(0) = 2^0 = 1 \)
- \( f(1) = 2^1 = 2 \)
- \( f(2) = 2^2 = 4 \)
- \( f(3) = 2^3 = 8 \)
- \( f(4) = 2^4 = 16 \)

Each output is exactly double the one before it. That constant multiplier, rather than a constant addend, is the signature of exponential behavior, and it explains why exponential functions can eventually grow — or shrink — far faster than any linear function.

Recognizing an exponential function starts with checking where the variable lives. If \( x \) is a base being raised to a fixed power, such as in \( x^2 \), the function is polynomial, not exponential. If \( x \) is the exponent itself, as in \( 2^x \), the function is exponential. This distinction matters because exponential functions model very different real situations than linear ones — situations where a quantity repeatedly multiplies by the same factor, such as population growth, compound interest, or radioactive decay. Over the rest of this chapter, you will learn to recognize, build, graph, and compare these functions.

## Exponential Growth

When the base \( b \) in \( f(x) = a \cdot b^x \) is greater than 1, the function models **exponential growth** — a quantity that increases by the same percentage, or factor, over each equal interval. Unlike linear growth, which adds the same amount every time, exponential growth multiplies the current value by a number bigger than 1, so the increases themselves get larger and larger.

Picture a population of bacteria that doubles every hour. Starting with 100 bacteria, after one hour there are 200, after two hours there are 400, after three hours there are 800. The population is not adding 100 each hour — it is multiplying by 2 each hour. This is exponential growth, and it can be modeled by

\[ f(x) = 100 \cdot 2^x \]

where \( x \) represents the number of hours that have passed.

!!! mascot-thinking "Why does the increase keep getting bigger?"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Ask yourself: if a value doubles every step, does it add the same amount each time? Think about going from 800 to 1,600 versus 100 to 200 — both are doublings, but one adds 800 while the other adds only 100. That's the heart of exponential growth: the *rate* stays the same, but the *amount added* keeps climbing.

A key feature of exponential growth is that it starts slowly and then accelerates dramatically. Early on, the values may look almost flat compared to a linear function, which can trick you into underestimating how fast the quantity will eventually rise. This is sometimes called the "hockey stick" effect, because a graph of exponential growth looks flat at first and then curves sharply upward, resembling the blade of a hockey stick.

Real-world examples of exponential growth include:

- Investments earning compound interest
- Viral spread of information on social media
- Population growth under ideal conditions
- The number of cells produced by repeated cell division

In each case, the underlying pattern is the same: the quantity is repeatedly multiplied by a factor greater than 1, so growth compounds on top of itself rather than accumulating at a constant pace.

## Exponential Decay

While exponential growth involves repeated multiplication by a factor greater than 1, **exponential decay** occurs when the base \( b \) in \( f(x) = a \cdot b^x \) is between 0 and 1. In this case, the quantity shrinks by the same percentage over each equal interval, getting smaller and smaller but never quite reaching zero.

Consider a medication that leaves the bloodstream so that only half remains every hour. If a patient starts with 80 milligrams, after one hour 40 milligrams remain, after two hours 20 milligrams remain, and after three hours only 10 milligrams remain. This can be modeled by

\[ f(x) = 80 \cdot \left(\frac{1}{2}\right)^x \]

where \( x \) is the number of hours elapsed. Notice that the amount is cut in half repeatedly, not reduced by a fixed number of milligrams each time.

Just as exponential growth accelerates upward, exponential decay approaches zero more and more slowly as \( x \) increases. The values get smaller by smaller and smaller amounts, forming a curve that flattens out but keeps inching toward — without ever touching — the x-axis. This never-reached boundary line is called a horizontal asymptote, a concept you will revisit when graphing exponential functions later in this chapter.

Common real-world examples of exponential decay include:

- Radioactive substances losing mass over time
- Medication leaving the bloodstream
- The value of a car depreciating year after year
- Light intensity decreasing as it passes through layers of water or glass

Recognizing decay situations in word problems is a matter of watching for repeated percentage decreases — phrases like "loses 10% each year" or "half-life of five days" signal that a quantity is being multiplied by a factor less than 1, not simply subtracted from. Confusing a percentage decrease with a flat subtraction is one of the most common errors students make when first modeling decay, so always ask whether the change is a fixed amount or a fixed percentage of the current value.

## Growth Factor

The **growth factor** is the number that a quantity is repeatedly multiplied by in an exponential growth situation — it is the value of \( b \) in \( f(x) = a \cdot b^x \) when \( b > 1 \). The growth factor tells you exactly how much bigger each new value is compared to the one before it.

If a population doubles every year, the growth factor is 2, since each value is 2 times the previous one. If a savings account grows by 5% each year, the growth factor is not 5 or 0.05 — it is 1.05, because the new balance equals the old balance plus 5% more of itself:

\[ \text{new amount} = \text{old amount} + 0.05 \times \text{old amount} = 1.05 \times \text{old amount} \]

In general, if a quantity grows by a rate \( r \) (written as a decimal), the growth factor \( b \) is found using:

\[ b = 1 + r \]

For example, a 12% annual increase has a growth factor of \( 1 + 0.12 = 1.12 \), while a 3% increase has a growth factor of \( 1.03 \).

It helps to keep straight the difference between the growth *rate* and the growth *factor*. The rate is the percentage increase, often given as a percent in a word problem. The factor is what you actually raise to a power in the exponential function, and it is always greater than 1 for growth.

| Growth Rate | Growth Factor |
|---|---|
| 2% | 1.02 |
| 10% | 1.10 |
| 25% | 1.25 |
| 100% | 2.00 |

A growth factor greater than 2 means the quantity more than doubles each interval, while a growth factor just barely above 1, like 1.01, represents slow but steady growth. Being able to convert quickly between a stated percentage rate and its corresponding growth factor is an essential skill for building exponential models later in this chapter, especially when working with compound interest and population problems.

## Decay Factor

Just as growth situations have a growth factor greater than 1, decay situations have a **decay factor** — the value of \( b \) in \( f(x) = a \cdot b^x \) when \( 0 < b < 1 \). The decay factor tells you what fraction of the previous value remains after each equal interval.

If a substance loses half its mass every day, the decay factor is \( \frac{1}{2} \), or 0.5, since each day's amount is half of the day before. If a car's value drops by 15% each year, the decay factor is found similarly to the growth factor, but with subtraction instead of addition:

\[ b = 1 - r \]

where \( r \) is the decay rate written as a decimal. A 15% annual decrease has a decay factor of \( 1 - 0.15 = 0.85 \), meaning 85% of the value remains after each year.

!!! mascot-warning "A common mix-up"
    ![Sage warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A frequent mistake is using the decay *rate* as the decay *factor* — writing \( 0.15 \) instead of \( 0.85 \) in the exponential model. Remember: the factor represents what remains, not what is lost. If 15% disappears, then 85% stays behind, so the factor must be 0.85.

Notice that both growth and decay factors come from the same relationship, just with a different sign on the rate:

| Situation | Rate | Factor Formula | Example Factor |
|---|---|---|---|
| Growth | increases by \( r \) | \( b = 1 + r \) | 1.08 for 8% growth |
| Decay | decreases by \( r \) | \( b = 1 - r \) | 0.92 for 8% decay |

Every decay factor lies strictly between 0 and 1. A decay factor close to 1, such as 0.98, represents slow decay, while a decay factor close to 0, such as 0.10, represents rapid decay. If you ever calculate a factor that is negative or greater than 1, double-check your work, since decay factors must always fall in that narrow range between zero and one.

## Initial Value

Every exponential function \( f(x) = a \cdot b^x \) has a starting point before any growth or decay has occurred — the value of the function when \( x = 0 \). This starting amount is called the **initial value**, and it is represented by the constant \( a \) in the general form.

You can verify this by substituting \( x = 0 \) into the function:

\[ f(0) = a \cdot b^0 = a \cdot 1 = a \]

Since any nonzero number raised to the power of 0 equals 1, the base and exponent disappear entirely at \( x = 0 \), leaving only \( a \). This means the initial value is simply the output of the function before the growth or decay factor has been applied even once.

In real-world contexts, the initial value usually represents a starting amount: the original population, the amount of money first deposited, the starting dose of a medication, or the purchase price of a car before depreciation begins. For example, in the model \( f(x) = 500 \cdot 1.04^x \) for an investment, the initial value of 500 represents the amount originally invested, before any interest has been earned.

Identifying the initial value in a word problem is often the first step in building an exponential model, and it typically appears as a phrase like "started with," "initially had," or "was purchased for." Watch for these signal phrases:

- "A city started with a population of 12,000."
- "You deposit \$2,000 into an account."
- "A sample initially contains 40 grams of a substance."

In each case, the number following the signal phrase becomes the value of \( a \) in the exponential model. Mixing up the initial value with the growth or decay factor is a common error — remember that \( a \) is a fixed starting amount that appears once, while \( b \) is the multiplier that gets applied again and again as \( x \) increases. Getting this distinction right is essential before moving on to building full exponential models in the next section.

## Exponential Models

Now that you understand exponential functions, growth and decay factors, and initial value, you are ready to build complete **exponential models** — equations of the form \( f(x) = a \cdot b^x \) that represent real situations. Building a model means translating a word problem into this equation by identifying the initial value \( a \) and the growth or decay factor \( b \).

!!! mascot-thinking "How do we turn words into a model?"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Ask yourself two questions for any exponential word problem: What is the starting amount? And by what factor does it change each time period? Once you answer both, you can write the model.

Consider this example: "A town has a population of 8,000 people, and the population grows by 3% each year." Here, the initial value is \( a = 8{,}000 \), and since the rate is a 3% increase, the growth factor is \( b = 1 + 0.03 = 1.03 \). The model is:

\[ P(t) = 8{,}000 \cdot 1.03^t \]

where \( t \) is the number of years. To predict the population after 5 years, substitute \( t = 5 \):

\[ P(5) = 8{,}000 \cdot 1.03^5 \approx 9{,}274 \]

One of the most important applications of exponential models is **compound interest**, where money grows because interest is earned not just on the original deposit but also on previously earned interest. The compound interest formula is a specific exponential model:

\[ A(t) = P \cdot (1 + r)^t \]

where \( P \) is the principal (initial value), \( r \) is the annual interest rate, \( t \) is time in years, and \( A(t) \) is the amount after \( t \) years. For example, \$1,000 invested at 4% annual interest grows according to \( A(t) = 1{,}000 \cdot 1.04^t \).

Building models follows a consistent process:

1. Identify the initial value from the starting amount in the problem.
2. Determine whether the situation describes growth or decay.
3. Convert the stated percentage rate into a growth or decay factor.
4. Write the equation in the form \( f(x) = a \cdot b^x \).
5. Use the model to answer questions by substituting values for \( x \).

Practicing this process with a variety of contexts — populations, investments, depreciation, and radioactive samples — builds the flexibility needed to recognize and construct exponential models confidently in any situation.

## Comparing Linear and Exponential

A crucial algebra skill is deciding which type of model — linear or exponential — actually fits a given situation. **Linear functions** change by a constant amount, called the rate of change or slope, for every equal step in \( x \). **Exponential functions** change by a constant factor, or percentage, for every equal step in \( x \). Choosing the wrong model leads to predictions that are increasingly inaccurate the farther you extrapolate.

!!! mascot-encourage "This distinction takes practice — that's normal"
    ![Sage encouraging](../../img/mascot/encourage.png){ class="mascot-admonition-img" }
    Many students find it tricky at first to tell whether a table represents linear or exponential change, especially when the numbers are close together. Don't worry if it takes a few tries — checking the pattern carefully every time is exactly the right habit to build, and mistakes here are simply useful evidence of what to check next.

The clearest way to distinguish the two is to examine a table of values. In a linear pattern, consecutive outputs share a common *difference*. In an exponential pattern, consecutive outputs share a common *ratio*.

| \( x \) | Linear: \( y = 3x + 2 \) | Exponential: \( y = 2 \cdot 3^x \) |
|---|---|---|
| 0 | 2 | 2 |
| 1 | 5 | 6 |
| 2 | 8 | 18 |
| 3 | 11 | 54 |

In the linear column, each output increases by 3 — a constant difference. In the exponential column, each output is 3 times the one before it — a constant ratio. Testing for a common difference versus a common ratio is the fastest, most reliable way to classify any table of values.

Over the long run, exponential growth always eventually overtakes linear growth, no matter how large the linear rate of change is or how small the exponential growth factor is, as long as the base is greater than 1. This happens because exponential growth compounds — each increase builds on all the previous increases — while linear growth simply keeps adding the same fixed amount forever. Choosing the appropriate model depends entirely on how the real quantity actually behaves: constant addition calls for a linear model, while constant percentage change calls for an exponential one.

## Graphing Exponentials

The graph of an exponential function has a distinctive curved shape that sets it apart from the straight lines of linear functions. For growth functions, where \( b > 1 \), the graph rises slowly at first, then curves sharply upward as \( x \) increases. For decay functions, where \( 0 < b < 1 \), the graph starts higher and curves downward, flattening as it approaches, but never touching, the x-axis.

<details markdown="1">
#### Diagram: Growth and Decay Curves

This diagram would show two curves plotted on the same coordinate grid. The growth curve, representing \( f(x) = 2^x \), starts near the x-axis on the left, stays low through negative and small positive values of \( x \), and then sweeps sharply upward toward the top right of the graph. The decay curve, representing \( f(x) = 2^{-x} \), mirrors this shape: it starts high on the left, drops quickly, and flattens out just above the x-axis as it extends to the right. A dashed horizontal line along the x-axis would mark the horizontal asymptote that both curves approach but never cross.
</details>

Every exponential function of the form \( f(x) = a \cdot b^x \) shares several key characteristics visible on its graph:

- **Y-intercept**: the graph always crosses the y-axis at the initial value \( a \), since \( f(0) = a \).
- **Horizontal asymptote**: the graph approaches, but never touches, the x-axis (the line \( y = 0 \)) as \( x \) moves toward positive or negative infinity, depending on growth or decay.
- **Domain**: all real numbers, since \( x \) may be any value.
- **Range**: all positive real numbers when \( a > 0 \), since \( b^x \) is always positive.
- **Shape**: a smooth curve with no sharp corners, always increasing (growth) or always decreasing (decay), never both.

Unlike a parabola, an exponential graph is never symmetric, and unlike a line, it never has a constant steepness — the steepness itself keeps changing. When sketching an exponential function by hand, plotting the y-intercept first, then a couple of nearby points, and sketching the asymptote as a dashed guideline produces an accurate curve quickly.

## Applications of Systems

Exponential models become even more powerful when combined with the systems techniques from Chapter 10. Many real decisions involve comparing two exponential models, or an exponential model against a linear one, to find out when one option overtakes another — exactly the kind of question a system of equations is built to answer.

Suppose you are choosing between two investment accounts. Account A starts with \$2,000 and grows according to \( A(t) = 2{,}000 \cdot 1.05^t \), while Account B starts with \$1,000 and grows according to \( B(t) = 1{,}000 \cdot 1.09^t \). To find when Account B catches up to Account A, you set the two expressions equal, forming a system:

\[ 2{,}000 \cdot 1.05^t = 1{,}000 \cdot 1.09^t \]

Just as with the linear systems in Chapter 10, solving means finding the value of \( t \) where both equations are simultaneously true — the point where the two graphs intersect. While solving this particular equation algebraically requires logarithms, which you will study in a later chapter, you can approximate the solution now using a table of values or a graph, checking where the two curves cross.

This same systems approach applies whenever two changing quantities need to be compared:

- Two companies with different starting sizes and different growth rates, to find when one overtakes the other
- A population declining under one policy versus growing under another
- A depreciating asset compared to an appreciating investment
- Two medication doses decaying at different rates in the bloodstream

!!! mascot-tip "Estimate before you calculate"
    ![Sage tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Before solving a system with exponential models, sketch or estimate both graphs. Knowing roughly where the curves should cross helps you check whether your final answer is reasonable.

Framing these comparisons as systems ties together everything from this chapter — initial values, growth and decay factors, and graphing — with the equation-solving skills from earlier in the course, giving you a complete toolkit for analyzing changing quantities in the real world.

---

!!! mascot-celebration "You did it!"
    ![Sage celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Let's figure this out — and you just did! You can now recognize exponential growth and decay, build models from word problems, graph their distinctive curves, and compare them to linear functions. These skills will keep showing up throughout math, science, and everyday decisions about money and change.

---
## Word Count Report

| Concept | Approx. Words Written | Target |
|---|---|---|
| Exponential Function | 362 | 372 |
| Exponential Growth | 355 | 372 |
| Exponential Decay | 331 | 372 |
| Growth Factor | 339 | 372 |
| Decay Factor | 351 | 372 |
| Initial Value | 351 | 372 |
| Exponential Models | 403 | 372 |
| Comparing Linear and Exponential | 376 | 372 |
| Graphing Exponentials | 366 | 372 |
| Applications of Systems | 392 | 372 |
| **Total** | **3626** | **3722** |
