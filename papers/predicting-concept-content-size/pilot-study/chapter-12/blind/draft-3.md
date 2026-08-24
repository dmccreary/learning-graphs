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
This chapter builds on Chapter 2 (Number Systems and Properties), Chapter 3 (Exponents and Powers), Chapter 8 (Introduction to Functions), Chapter 9 (Graphing and Linear Functions), and Chapter 10 (Systems of Equations and Inequalities).

---

## Exponential Function

!!! mascot-welcome "Welcome!"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Let's figure this out! In this chapter, we will meet a new family of functions where the input variable lives in the exponent instead of the base. You already know how to graph a line where the output changes by the same *amount* every step. Get ready to meet a function whose output changes by the same *factor* every step — and to see why that single difference changes everything.

In Chapter 9, you studied linear functions, where equal steps in \(x\) produce equal additive changes in \(y\). Every time \(x\) increased by 1, the output of a linear function \(f(x) = mx + b\) changed by exactly \(m\), no matter how large \(x\) already was. An **exponential function** works differently. It is a function in which the input variable appears as an exponent, and equal steps in \(x\) produce equal *multiplicative* changes in \(y\).

The general form of an exponential function is

\[
f(x) = a \cdot b^x
\]

where \(a\) is a nonzero real number called the initial value, \(b\) is a positive real number called the base, and \(x\) is any real number. The base must satisfy two conditions: \(b > 0\) and \(b \neq 1\). If \(b\) were negative, raising it to fractional powers like \(b^{1/2}\) could produce results that are not real numbers. If \(b\) equaled 1, the function would simplify to the constant function \(f(x) = a\), since \(1\) raised to any power is still \(1\) — and a constant function is not exponential at all.

Notice how this form connects to what you already know from Chapter 3. There, you learned the rules for exponents, such as \(b^m \cdot b^n = b^{m+n}\). Those same rules explain why exponential functions grow the way they do: increasing \(x\) by 1 always multiplies the output by another factor of \(b\), because \(b^{x+1} = b^x \cdot b^1\).

!!! mascot-thinking "Key Concept"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Suppose \(f(x) = 3 \cdot 2^x\). What is \(f(0)\)? Try it before reading on. Since any nonzero base raised to the power 0 equals 1, \(f(0) = 3 \cdot 2^0 = 3 \cdot 1 = 3\). Notice that \(f(0)\) is simply the initial value \(a\) — a pattern that will matter throughout this chapter.

**Worked Example.** Consider the exponential function \(f(x) = 3 \cdot 2^x\). To evaluate this function, substitute each value of \(x\) and simplify using the order of operations: apply the exponent first, then multiply by \(a\).

| \(x\) | Calculation | \(f(x)\) |
|---|---|---|
| 0 | \(3 \cdot 2^0\) | 3 |
| 1 | \(3 \cdot 2^1\) | 6 |
| 2 | \(3 \cdot 2^2\) | 12 |
| 3 | \(3 \cdot 2^3\) | 24 |

Look closely at the output column: 3, 6, 12, 24. Each value is exactly double the one before it. This is the signature behavior of an exponential function — a constant *ratio* between consecutive outputs, rather than a constant difference. Contrast this with a linear function like \(g(x) = 3x + 3\), whose outputs at the same inputs would be 3, 6, 9, 12: a constant difference of 3 each time, not a constant ratio.

The domain of an exponential function is all real numbers, since you can raise a positive base to any real exponent, including negative numbers and fractions. The range depends on the sign of \(a\): when \(a > 0\), every output is positive, so the range is all positive real numbers. Exponential functions never output zero, because a nonzero number raised to any power never equals zero. This property will become important later in the chapter, when we discuss the graph's behavior as \(x\) becomes very negative.

Recognizing the values of \(a\) and \(b\) inside a written equation is a skill you will use throughout this chapter. In the equation \(f(x) = 5 \cdot 4^x\), the initial value is \(a = 5\) and the base is \(b = 4\). In \(g(x) = 10 \cdot (0.5)^x\), the initial value is \(a = 10\) and the base is \(b = 0.5\). Practicing this identification now will make it much easier later in the chapter, when you classify a function as growth or decay just by inspecting its base.

## Exponential Growth

An exponential function models **exponential growth** when its output values increase as \(x\) increases, becoming larger and larger at an accelerating rate. This happens precisely when the base \(b\) in \(f(x) = a \cdot b^x\) satisfies \(b > 1\), assuming the initial value \(a\) is positive. Each time \(x\) increases by 1, the previous output is multiplied by a number greater than 1, so the result is always bigger than the step before it — and the amount of increase itself keeps getting bigger too.

This accelerating pattern is what makes exponential growth feel surprising compared to linear growth. Early on, an exponential function can look deceptively small, even smaller than a linear function with a large slope. But because each step multiplies rather than adds, an exponential function eventually overtakes any linear function, no matter how steep that line is.

!!! mascot-tip "Helpful Hint"
    ![Sage with a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    A quick way to check for exponential growth: divide any output by the output right before it. If you always get the same number, and that number is greater than 1, you have exponential growth, and that number is the base \(b\).

**Worked Example.** A video posted online has 200 views on day 0. The number of views triples every day. Since the views are multiplied by the same factor, 3, for every one-day increase in \(x\), this situation is modeled by an exponential growth function:

\[
V(x) = 200 \cdot 3^x
\]

Here \(a = 200\) is the starting number of views, and \(b = 3\) is the base, since the base is greater than 1. After 1 day, \(V(1) = 200 \cdot 3 = 600\) views. After 2 days, \(V(2) = 200 \cdot 3^2 = 1{,}800\) views. After 4 days, \(V(4) = 200 \cdot 3^4 = 16{,}200\) views. Notice how quickly the numbers climb: doubling the number of days more than quadruples the output, because the growth compounds on itself rather than accumulating steadily.

It's worth comparing this to a linear function that starts out just as strong. Suppose a rival video, also starting at 200 views, instead gained a steady 400 views every day: \(L(x) = 200 + 400x\). On day 1, the two videos tie, both at 600 views. But by day 4, the linear video has only \(200 + 400(4) = 1{,}800\) views, far behind the exponential video's 16,200. This crossover is the hallmark of exponential growth: it may start no faster than a line, but it always pulls ahead in the long run.

Real-world quantities that often follow exponential growth include populations with abundant resources, viral social media content, and money earning compound interest, which you will explore later in this chapter. In every case, the defining feature is the same: the quantity changes by a consistent percentage or multiplier over each equal time interval, not by a fixed amount.

## Exponential Decay

While exponential growth describes quantities that increase over time, **exponential decay** describes quantities that decrease over time, approaching zero but never quite reaching it. In the general form \(f(x) = a \cdot b^x\), decay occurs when the base satisfies \(0 < b < 1\), again assuming a positive initial value \(a\). Each step multiplies the previous output by a fraction less than 1, so the result keeps shrinking, though it always remains positive.

It helps to compare decay directly to growth using the same function form you already know. Both situations use \(f(x) = a \cdot b^x\); only the size of the base changes the direction of the pattern. A base greater than 1 stretches the output larger with each step, while a base between 0 and 1 shrinks it. This is why checking the value of \(b\) is the fastest way to classify any exponential function as growth or decay.

**Worked Example.** A carnival balloon holds 800 cubic centimeters of helium at the moment it is released. Each hour, the balloon loses 20 percent of its remaining helium to a slow leak, so 80 percent, or a factor of 0.8, remains after every hour. The volume after \(x\) hours is

\[
V(x) = 800 \cdot (0.8)^x
\]

After 1 hour, \(V(1) = 800 \cdot 0.8 = 640\) cubic centimeters. After 2 hours, \(V(2) = 800 \cdot (0.8)^2 = 512\) cubic centimeters. Notice that the balloon loses 160 cubic centimeters during the first hour but only 128 cubic centimeters during the second hour — the amount lost shrinks over time because each hour's loss is a percentage of a smaller starting amount. This shrinking-loss pattern is characteristic of exponential decay and distinguishes it from a steady, constant leak, which would instead be modeled by a linear function.

Exponential decay describes many real-world situations beyond a leaking balloon. Radioactive substances lose a fixed percentage of their mass over each equal time interval, medications break down in the bloodstream at a steady percentage rate, and the resale value of electronics or vehicles often drops by a consistent percentage each year. In every case, the quantity shrinks by the same factor over each equal interval, never by the same fixed amount — a percentage decrease, not a flat subtraction, is the key clue that a decay model applies rather than a linear one.

## Growth Factor

The **growth factor** of an exponential growth function is the base \(b\) in \(f(x) = a \cdot b^x\) when \(b > 1\); it represents the number that each output is multiplied by for every one-unit increase in \(x\). The growth factor tells you, at a glance, how quickly a quantity is expanding: a growth factor close to 1, such as 1.02, indicates slow growth, while a growth factor of 5 indicates rapid growth.

Growth factors are often built from percentage increases. If a quantity grows by \(r\) percent each period, the growth factor is found by adding that percentage, written as a decimal, to 1:

\[
b = 1 + r
\]

For example, a 6 percent yearly increase corresponds to a growth factor of \(1 + 0.06 = 1.06\), since the new amount each year equals the original 100 percent plus an additional 6 percent.

**Worked Example.** A small town's population grows by 4 percent each year, starting at 5,000 residents. The growth factor is \(b = 1 + 0.04 = 1.04\), so the population after \(x\) years is modeled by \(P(x) = 5{,}000 \cdot (1.04)^x\). After 1 year, the population is \(5{,}000 \cdot 1.04 = 5{,}200\) residents. Identifying the growth factor first, before writing the full function, is a reliable strategy for building exponential models from a stated percentage increase.

You can also find a growth factor directly from a table of values, without being told a percentage at all: divide any output by the one immediately before it. For the town's population, dividing the year-2 population, \(P(2) = 5{,}000 \cdot (1.04)^2 \approx 5{,}408\), by the year-1 population, 5,200, gives \(5{,}408 \div 5{,}200 \approx 1.04\), the same growth factor recovered from the ratio of consecutive outputs.

## Decay Factor

The **decay factor** of an exponential decay function is the base \(b\) in \(f(x) = a \cdot b^x\) when \(0 < b < 1\); it represents the fraction of the previous output that remains after each one-unit increase in \(x\). A decay factor near 1, such as 0.98, indicates slow decay, while a decay factor near 0, such as 0.1, indicates rapid decay.

Like growth factors, decay factors are often built from a stated percentage decrease. If a quantity decreases by \(r\) percent each period, the decay factor is found by subtracting that percentage, written as a decimal, from 1:

\[
b = 1 - r
\]

For example, a 15 percent yearly decrease corresponds to a decay factor of \(1 - 0.15 = 0.85\), since 85 percent of the quantity remains after the decrease.

!!! mascot-warning "Common Mistake"
    ![Sage warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Do not use the percentage itself as the decay factor. A 15 percent decrease does not mean \(b = 0.15\); it means 15 percent is *removed*, so 85 percent remains and \(b = 0.85\). Using the raw percentage as the base is one of the most common exponential decay errors.

**Worked Example.** A used car valued at \$18,000 loses 12 percent of its value each year. The decay factor is \(b = 1 - 0.12 = 0.88\), so its value after \(x\) years is \(V(x) = 18{,}000 \cdot (0.88)^x\). After 1 year, the car is worth \(18{,}000 \cdot 0.88 = \$15{,}840\).

Notice that a decay factor must always stay strictly between 0 and 1. A value of \(b = 0\) would mean the entire quantity disappears after just one step, and a value of \(b = 1\) would mean nothing changes at all, so neither describes true decay. Checking the car's value after a second year confirms the pattern continues correctly: \(V(2) = 18{,}000 \cdot (0.88)^2 = \$13{,}939.20\), which is 88 percent of the previous year's value, exactly as expected.

## Initial Value

The **initial value** of an exponential function is the coefficient \(a\) in \(f(x) = a \cdot b^x\); it represents the output of the function when \(x = 0\), before any growth or decay factors have been applied. Substituting \(x = 0\) into the general form confirms this, since \(b^0 = 1\) for any valid base, leaving \(f(0) = a \cdot 1 = a\).

In real-world models, the initial value usually represents a starting amount: the population at year zero, the initial deposit in a savings account, or the height of a bounced ball at the very first bounce. Correctly identifying the initial value is essential, because every other output in the model is generated by repeatedly multiplying this one starting number by the growth or decay factor.

**Worked Example.** A savings account is opened with a deposit of \$400, and its balance grows according to \(B(x) = 400 \cdot (1.03)^x\), where \(x\) is measured in years. Here the initial value is \(a = 400\), matching the original deposit. Checking this against the function confirms it: \(B(0) = 400 \cdot (1.03)^0 = 400 \cdot 1 = 400\), exactly the starting deposit before any interest has been earned. If a problem instead gave you the balance after 1 year, you would need to work backward through the growth factor to recover the initial value.

The initial value is also easy to spot in other representations of the same function. In a table of values, it is simply the output paired with \(x = 0\). On a graph, it is the point where the curve crosses the y-axis, a detail you will use again later in this chapter when sketching exponential graphs. Confusing the initial value with the growth or decay factor is a common error, so it helps to ask: "What did we start with?" for \(a\), and "What are we multiplying by each step?" for \(b\).

## Exponential Models

An **exponential model** is an exponential function, \(f(x) = a \cdot b^x\), built to represent a specific real-world situation by matching \(a\) to a known starting amount and \(b\) to a known growth or decay factor. Building a model is a repeatable process, no matter the context:

1. Identify the initial value, \(a\), usually the amount present at the very start, when \(x = 0\).
2. Determine whether the quantity is increasing or decreasing over time.
3. Convert the stated percentage change into a growth or decay factor, \(b\), using \(b = 1 + r\) or \(b = 1 - r\).
4. Substitute \(a\) and \(b\) into \(f(x) = a \cdot b^x\).

Following these same four steps works whether the situation involves money, population, chemistry, or any other quantity that changes by a consistent percentage over equal intervals.

A particularly important exponential model is **compound interest**, where money in an account earns interest not only on the original deposit but also on previously earned interest. This compounding is exactly what makes the growth exponential rather than linear: each period's interest is calculated on an already-larger balance.

**Worked Example.** Suppose \$1,000 is invested in an account earning 5 percent interest per year, compounded annually. The growth factor is \(b = 1 + 0.05 = 1.05\), and the initial value is \(a = 1{,}000\), so the model is

\[
A(x) = 1{,}000 \cdot (1.05)^x
\]

After 3 years, the balance is \(A(3) = 1{,}000 \cdot (1.05)^3 \approx \$1{,}157.63\), noticeably more than the \$1,150 that simple, non-compounding interest would produce. This gap between simple and compound interest widens every year, since compound interest keeps earning interest on interest already earned — the same accelerating pattern you saw in the exponential growth section.

## Comparing Linear and Exponential

Choosing between a linear model and an exponential model depends entirely on how a quantity changes over equal intervals. A **linear function** changes by a constant *amount* each step, while an **exponential function** changes by a constant *factor*, or percentage, each step. Reading a problem carefully for the phrase "increases by a fixed number" versus "increases by a fixed percent" is often the fastest way to decide which model applies.

A table of values makes the distinction concrete. Consider two situations, both starting at 100.

| \(x\) | Linear: \(f(x) = 100 + 20x\) | Exponential: \(g(x) = 100 \cdot (1.2)^x\) |
|---|---|---|
| 0 | 100 | 100 |
| 1 | 120 | 120 |
| 2 | 140 | 144 |
| 3 | 160 | 172.8 |

At \(x = 1\), both functions agree, but they diverge quickly afterward: the linear function adds exactly 20 every step, while the exponential function's additions grow larger each time. Over a long enough interval, the exponential function will always eventually overtake the linear one, regardless of the starting values.

This crossover behavior has a practical consequence: over a short time frame, a linear model can look just as strong as, or even stronger than, an exponential model with a similar starting value. But because exponential growth compounds, extending the time frame far enough always lets the exponential function catch up and surpass the linear one. Recognizing which model actually fits a real situation, and being cautious about how far into the future a prediction is extended, is an essential skill for interpreting growth claims in the real world.

!!! mascot-encourage "You Can Do This!"
    ![Sage encouraging](../../img/mascot/encourage.png){ class="mascot-admonition-img" }
    Mixing up these two models is a completely normal stumbling block — even professionals sometimes misjudge which one fits a real situation. When in doubt, compute the change between just two consecutive outputs. A constant difference points to linear; a constant ratio points to exponential.

## Graphing Exponentials

The graph of an exponential growth function, \(f(x) = a \cdot b^x\) with \(a > 0\) and \(b > 1\), rises slowly on the left, passes through the point \((0, a)\), and then climbs steeply as \(x\) increases. The graph of an exponential decay function, with \(0 < b < 1\), does the reverse: it starts high on the left, passes through \((0, a)\), and flattens out as \(x\) increases, approaching but never touching the x-axis.

That flattening behavior defines a **horizontal asymptote**, a horizontal line that the graph approaches but never crosses. For the basic exponential functions in this chapter, that line is \(y = 0\), since outputs get closer and closer to zero without ever reaching it.

<details markdown="1">
#### Diagram: Exponential Growth and Decay Curves
This diagram would show two curves on the same coordinate grid. The growth curve, for \(f(x) = 2^x\), starts near the x-axis on the left, passes through \((0, 1)\), and rises steeply toward the top right. The decay curve, for \(g(x) = (0.5)^x\), is its mirror image: it starts high on the left, passes through \((0, 1)\), and flattens toward the x-axis on the right. A dashed horizontal line at \(y = 0\) marks the shared asymptote for both curves.
</details>

Every basic exponential function of this form shares three features worth checking whenever you sketch or interpret a graph: it passes through \((0, a)\), it never crosses the x-axis, and it is either always increasing (growth) or always decreasing (decay), never both.

The value of \(a\) also affects the graph directly: since every exponential function of this form passes through \((0, a)\), a larger initial value shifts the entire curve higher on the y-axis, while a smaller one shifts it lower, without changing whether the curve represents growth or decay. Only the base \(b\) determines that direction.

## Applications of Systems

Exponential functions frequently appear alongside the systems of equations and inequalities you studied in Chapter 10, especially when comparing two competing options. Finding where two exponential models, or an exponential and a linear model, produce the same output means solving a system: the point where their graphs intersect represents the input value at which both situations yield equal results.

**Worked Example.** Two internet plans are available. Plan A charges a flat \$40 per month with no change over time, modeled as \(f(x) = 40\), a special case of a linear function with zero slope. Plan B starts cheaper, at \$25 per month, but its price grows by 10 percent every month due to rising fees, modeled as \(g(x) = 25 \cdot (1.10)^x\). Setting up the system

\[
\begin{cases} f(x) = 40 \\ g(x) = 25 \cdot (1.10)^x \end{cases}
\]

and testing values shows that \(g(4) = 25 \cdot (1.10)^4 \approx 36.60\), still below \$40, while \(g(5) \approx 40.26\), just above it. Somewhere between month 4 and month 5, the two plans cost the same amount, and after that point, Plan B becomes more expensive. This kind of comparison, solving a system with one exponential equation, helps consumers decide which option is better for a given time frame, and it reinforces why recognizing exponential change matters well beyond the math classroom.

!!! mascot-celebration "Great Work!"
    ![Sage celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You made it through exponential functions! You can now tell growth from decay at a glance, find growth and decay factors from a percentage, and decide whether a linear or exponential model fits a real situation. That's a powerful set of tools for describing a world full of quantities that multiply rather than just add. Let's figure this out — next chapter, and beyond!

---
