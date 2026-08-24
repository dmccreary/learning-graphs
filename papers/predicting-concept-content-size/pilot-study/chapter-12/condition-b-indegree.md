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
    Let's figure this out! In this chapter we meet a new kind of function that changes by multiplying instead of adding. Get ready to see how a single folded sheet of paper or one penny doubled every day can grow far faster than you would ever guess.

In Chapter 9, you studied linear functions, where the output changes by *adding* the same amount for every step in the input. If you save 3 dollars every week, after \(x\) weeks you have \(3x\) dollars added to your starting balance — the total grows by repeated addition. An **exponential function** works differently: its output changes by *multiplying* by the same factor for every step in the input. That single shift, from adding to multiplying, is the most important idea in this chapter.

An exponential function has the general form

\[
f(x) = a \cdot b^x
\]

where \(a\) is the **initial value** (the output when \(x = 0\)), \(b\) is the **base** of the exponential (the number being repeatedly multiplied), and \(x\) is the exponent, which usually represents time. For \(f(x) = a \cdot b^x\) to behave like a genuine exponential function, three conditions must hold: \(a \neq 0\), \(b > 0\), and \(b \neq 1\). If \(b\) were 1, every output would equal \(a\), giving a constant function instead. If \(b\) were negative or zero, the outputs would jump around or become undefined for many values of \(x\), so mathematicians restrict \(b\) to positive numbers other than 1. For example, \(f(x) = 5 \cdot (-2)^x\) is not treated as a proper exponential function in this course, because raising a negative base to a fractional exponent such as \(x = 0.5\) does not produce a real number, leaving gaps in the domain.

Recall from Chapter 8 that the notation \(f(x)\) simply means "the output of function \(f\) when the input is \(x\)." Nothing about function notation changes here — you still substitute a specific number for \(x\) and simplify to find the output. What changes is *where* the input variable appears. In a linear function such as \(f(x) = mx + b\), the input \(x\) is multiplied by a constant slope. In an exponential function, the input \(x\) sits in the exponent itself, which is exactly why small changes in \(x\) can cause such large changes in the output.

Consider a concrete example. Suppose a video posted online has 5 views, and the number of views triples every hour. After \(x\) hours, the number of views is

\[
f(x) = 5 \cdot 3^x
\]

Here \(a = 5\) is the initial value and \(b = 3\) is the base. After 1 hour there are \(5 \cdot 3^1 = 15\) views. After 2 hours there are \(5 \cdot 3^2 = 45\) views. After 4 hours there are \(5 \cdot 3^4 = 405\) views. Notice that each output is exactly 3 times the one before it — that constant ratio is the fingerprint of an exponential function, just as a constant difference is the fingerprint of a linear function.

The table below tracks the same view count hour by hour.

| \(x\) (hours) | \(f(x) = 5 \cdot 3^x\) |
|---|---|
| 0 | 5 |
| 1 | 15 |
| 2 | 45 |
| 3 | 135 |
| 4 | 405 |

!!! mascot-thinking "Key Concept"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    How can you tell from a table of values whether a function is linear or exponential? Look at the outputs. If you keep *subtracting* consecutive outputs and always get the same difference, the function is linear. If you keep *dividing* consecutive outputs and always get the same ratio, the function is exponential. Try it on the view-count example above — dividing 45 by 15 and 405 by 135 both give you 3!

A second example shows what happens when the base is a fraction. Suppose a bowl starts with 800 milligrams of a medicine, and the amount remaining is multiplied by \(\tfrac{1}{2}\) every hour as the body processes it. The model is

\[
f(x) = 800 \cdot \left(\tfrac{1}{2}\right)^x
\]

Here the initial value is still \(a = 800\), but now the base \(b = \tfrac{1}{2}\) is between 0 and 1, so each output is smaller than the one before it. After 1 hour, \(f(1) = 400\); after 2 hours, \(f(2) = 200\); after 3 hours, \(f(3) = 100\). The amount keeps shrinking, but it never reaches exactly zero — it only gets closer and closer. This behavior is explored in depth later in the chapter as exponential decay. This pattern, in which a quantity is repeatedly cut in half over equal time intervals, is often called a **half-life**, a term you may encounter again in a science course.

These two examples reveal that the sign of the base's relationship to 1 controls the overall shape of an exponential function. The table below summarizes the key features you can read directly from the equation \(f(x) = a \cdot b^x\).

| Feature | What it means | How to find it |
|---|---|---|
| Initial value | Output when \(x = 0\) | Read the value of \(a\) |
| Base | The repeated multiplier | Read the value of \(b\) |
| Domain | Allowed input values | All real numbers |
| Range (if \(a > 0\)) | Allowed output values | All positive real numbers |
| End behavior | Direction the graph moves | Grows without bound if \(b>1\); shrinks toward 0 if \(0<b<1\) |

<details markdown="1">
#### Diagram: Two Exponential Functions Compared
This diagram would show a single coordinate grid with two curves plotted on the same axes. The first curve, labeled \(f(x) = 5 \cdot 3^x\), starts near the x-axis on the left, passes through the point \((0, 5)\), and sweeps upward steeply to the right, illustrating exponential growth. The second curve, labeled \(f(x) = 800 \cdot (\tfrac{1}{2})^x\), starts high on the left at the point \((0, 800)\) and flattens as it sweeps downward and to the right, getting closer and closer to the x-axis without ever touching it, illustrating exponential decay. A dashed horizontal line would run along the x-axis itself, showing the boundary line that both curves approach but never cross.
</details>

Notice that neither curve ever actually touches the x-axis. This horizontal line that the graph approaches but never reaches is called an **asymptote**, and for the basic exponential function \(f(x) = a \cdot b^x\), that asymptote is always the line \(y = 0\). This is a fundamentally different shape from any linear function you studied in Chapter 9, since a line either keeps rising, keeps falling, or stays perfectly flat forever — it never levels off toward a boundary the way an exponential curve does. A straight, level line only happens in a linear function when the slope \(m\) equals 0; an exponential curve, by contrast, keeps changing forever, even while it looks almost flat far out to the right.

Exponential functions are also easy to confuse with functions built from exponents in a different way. Compare \(f(x) = 2^x\), where the variable is the exponent, to \(g(x) = x^2\), where the variable is the base. These look similar but behave very differently: \(g(x) = x^2\) is a quadratic function you will study in a later chapter, with a U-shaped graph, while \(f(x) = 2^x\) is exponential, with the growing or shrinking curve shape shown above. Evaluate both at \(x = 10\): \(g(10) = 10^2 = 100\), while \(f(10) = 2^{10} = 1024\). Even though the exponential output starts out smaller for small values of \(x\), it eventually outpaces the quadratic output by a wide margin. Always check which part of the expression — the base or the exponent — contains the variable before deciding what kind of function you are looking at.

Throughout the rest of this chapter, you will study exponential growth and exponential decay as the two major cases of the exponential function, learn the vocabulary used to describe their pieces, and practice building and comparing exponential models from real situations.

## Exponential Growth

**Exponential growth** describes an exponential function \(f(x) = a \cdot b^x\) in which the base \(b\) is greater than 1. In this case, every time \(x\) increases by 1, the output is multiplied by a number bigger than 1, so the function keeps getting larger — slowly at first, and then extremely fast. This is the case you saw in the video-view example, where \(f(x) = 5 \cdot 3^x\) tripled every hour.

Exponential growth is often described using a growth *rate* rather than a growth *factor* directly. A growth rate is usually given as a percent increase per time period. If a town's population grows by 4% each year, that means every year the population is multiplied by \(1 + 0.04 = 1.04\). In general, if \(r\) is the growth rate written as a decimal, the base of the exponential model is

\[
b = 1 + r
\]

So a population that starts at 12,000 people and grows 4% per year can be modeled by

\[
P(x) = 12{,}000 \cdot (1.04)^x
\]

where \(x\) is the number of years that have passed. After 1 year, \(P(1) = 12{,}480\). After 10 years, \(P(10) \approx 17{,}763\). Notice how much more the population grows between year 9 and year 10 than it did between year 0 and year 1 — this accelerating pattern, where the amount of increase itself keeps increasing, is the signature behavior of exponential growth.

The table below tracks the town's population at several points in time, along with how many new residents were added since the previous year listed.

| Years, \(x\) | Population, \(P(x)\) | Increase from previous year |
|---|---|---|
| 0 | 12,000 | — |
| 1 | 12,480 | 480 |
| 2 | 12,979 | 499 |
| 5 | 14,600 | about 561 |
| 10 | 17,763 | about 684 |

Even though the growth rate stays fixed at 4% every single year, the actual number of new residents keeps climbing, because 4% of a larger population is a larger number of people.

!!! mascot-warning "Common Mistake"
    ![Sage warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A growth rate of 4% does **not** mean you multiply by 0.04. Many students write the base as \(b = r\) instead of \(b = 1 + r\), which accidentally describes a function that shrinks almost to nothing every step! Always add the rate to 1 first: 4% growth means \(b = 1.04\), not \(b = 0.04\).

One of the most important real-world uses of exponential growth is **compound interest**, where a bank account earns interest not only on the original deposit but also on all interest already earned. If you deposit \(P\) dollars into an account that pays an annual interest rate \(r\) (as a decimal), compounded once per year, the balance after \(x\) years is

\[
A(x) = P \cdot (1 + r)^x
\]

For example, a deposit of \(\$500\) at an annual rate of 6% grows according to \(A(x) = 500 \cdot (1.06)^x\). After 5 years, the balance is \(A(5) \approx \$669.11\), even though no additional money was ever deposited. Compare this to simple interest, which would only add a fixed amount each year — compound interest grows faster precisely because each year's interest is calculated on a bigger balance than the year before.

Compound interest can also be calculated more often than once a year — monthly, weekly, or even daily — and each additional compounding period during the same year produces a slightly larger final balance, since interest starts earning its own interest sooner. Banks often advertise this more precisely using an Annual Percentage Yield, but the underlying exponential idea, repeated multiplication by a growth factor, stays exactly the same no matter how the compounding periods are sliced.

Exponential growth shows up throughout science and everyday life. A few common examples include:

- Population growth of humans, animals, or bacteria colonies under ideal conditions
- Compound interest on savings accounts, retirement funds, and loans
- The spread of a rumor, a trend, or a contagious illness early in an outbreak
- Computing power, historically described as doubling roughly every couple of years
- Viral social media content, where every viewer shares with several new viewers

In every one of these situations, the key mathematical signal is the same: the quantity is multiplied by a constant factor greater than 1 during each equal time period, rather than having a constant amount added to it. Whenever a description uses words like "per year," "per hour," or "per generation" together with a percent of the *current* amount rather than a fixed amount, exponential growth — not linear growth — is almost always the appropriate model.

## Exponential Decay

**Exponential decay** describes an exponential function \(f(x) = a \cdot b^x\) in which the base \(b\) is between 0 and 1. Every time \(x\) increases by 1, the output is multiplied by a fraction less than 1, so the quantity keeps shrinking toward zero — quickly at first, then more and more slowly. You saw this pattern earlier in the chapter with the medicine example, \(f(x) = 800 \cdot (\tfrac{1}{2})^x\).

Just as growth can be described with a growth rate, decay can be described with a **decay rate**, the percent decrease per time period. If \(r\) is the decay rate written as a decimal, the base of the exponential model is

\[
b = 1 - r
\]

For instance, a car worth \(\$24{,}000\) that loses 15% of its value every year can be modeled by

\[
V(x) = 24{,}000 \cdot (0.85)^x
\]

since \(1 - 0.15 = 0.85\). After 1 year, the car is worth \(V(1) = \$20{,}400\). After 5 years, \(V(5) \approx \$10{,}649\). Notice that the value never reaches exactly zero in this model — like every exponential function, it approaches the horizontal asymptote \(y = 0\) but never actually touches it, even though in real life the car's value would eventually be negligible.

The table below shows the car's declining value at several points in time.

| Years, \(x\) | Value, \(V(x)\) |
|---|---|
| 0 | \$24,000 |
| 1 | \$20,400 |
| 2 | \$17,340 |
| 5 | \$10,649 |
| 10 | \$4,725 |

Just as exponential growth accelerates, exponential decay decelerates: the car loses \$3,600 in the first year alone, but only about \$1,000 between year 9 and year 10, because 15% of a smaller value is a smaller amount of money.

!!! mascot-encourage "You Can Do This"
    ![Sage encouraging](../../img/mascot/encourage.png){ class="mascot-admonition-img" }
    Decay problems can feel tricky because everything is shrinking instead of growing, but the process is exactly the same as growth problems: turn the percent into a decimal, decide whether to add or subtract it from 1, and plug the result in as \(b\). If you can build a growth model, you can build a decay model too!

Exponential decay appears throughout science, finance, and medicine. Common examples include:

- Radioactive substances losing mass through radioactive decay
- Cars, electronics, and other assets losing resale value through depreciation
- Medication concentration decreasing in the bloodstream over time
- Light intensity fading as it passes through layers of water or tinted glass
- Sound intensity fading as the distance from its source increases

A particularly common special case of exponential decay is a **half-life**, the time it takes for a quantity to be cut exactly in half. Radioactive elements, cleared medications, and even the charge draining from a phone battery under steady use are often described this way, and every half-life situation uses a decay factor of exactly \(b = 0.5\) — just like the medicine example earlier in this chapter.

Growth and decay are really two sides of the same equation, distinguished only by whether the base \(b\) is above or below 1. Recognizing which case applies is the first step in building an accurate exponential model of any real situation.

## Growth Factor

The **growth factor** is the base \(b\) of an exponential growth model, the number that the quantity is multiplied by during each time period. A growth factor is always greater than 1. It relates to the growth rate \(r\) by the equation \(b = 1 + r\); for example, a growth rate of 8% corresponds to a growth factor of \(1.08\). If a plant's height is multiplied by 1.2 every week, its growth factor is simply 1.2 — no percent conversion is needed, since the factor itself is already the multiplier used directly in the exponential equation \(f(x) = a \cdot b^x\). Growth factors are always written as decimals greater than 1, such as 1.03, 1.15, or 2.5; the farther above 1 the growth factor is, the faster the exponential function increases. A growth factor can also come straight from data — if a value doubles every step, the growth factor is simply 2.

## Decay Factor

The **decay factor** is the base \(b\) of an exponential decay model, the number that the quantity is multiplied by during each time period. A decay factor is always between 0 and 1. It relates to the decay rate \(r\) by the equation \(b = 1 - r\); for example, a decay rate of 20% corresponds to a decay factor of \(0.80\). If a bouncing ball's height is multiplied by 0.75 after every bounce, its decay factor is 0.75, meaning the ball reaches 75% of its previous height each time. Decay factors are always written as decimals between 0 and 1, such as 0.90, 0.5, or 0.02; the closer the decay factor is to 0, the faster the quantity disappears, while a decay factor close to 1 means the quantity barely changes each step.

## Initial Value

The **initial value** is the output of a function when the input is 0 — in an exponential model \(f(x) = a \cdot b^x\), it is the constant \(a\). It represents the starting amount before any growth or decay has occurred, such as the original population, the original investment, or the original dose of medicine. Graphically, the initial value is the point where the curve crosses the vertical axis, \((0, a)\). For \(f(x) = 250 \cdot (1.1)^x\), the initial value is 250, since \(f(0) = 250 \cdot (1.1)^0 = 250 \cdot 1 = 250\). The initial value should not be confused with the base: changing \(a\) shifts every output up or down by the same multiple, while changing \(b\) changes how quickly the curve rises or falls. In a real-world model, a negative initial value rarely makes sense, since quantities like populations, dollars, and doses cannot realistically start out below zero.

## Exponential Models

An **exponential model** is an equation of the form \(f(x) = a \cdot b^x\) built to represent a specific real-world situation, using the initial value and growth or decay factor drawn from that situation. Building a model takes three steps:

- Find the initial value, \(a\).
- Find the growth or decay factor, \(b\).
- Write \(f(x) = a \cdot b^x\).

For example, a town starting at 3,000 people and shrinking 2% per year gives the model \(f(x) = 3{,}000 \cdot (0.98)^x\), which can then be used to predict the population at any future time \(x\). Once a model is built, it can predict values far beyond the original data, though predictions made very far into the future should be treated with caution — real situations, unlike the idealized equation, are eventually limited by outside factors such as available resources or changing conditions.

## Comparing Linear and Exponential

Linear functions grow by *adding* a constant amount each step, producing a straight-line graph, while exponential functions grow by *multiplying* by a constant factor each step, producing a curve. Over the long run, an exponential growth function with \(b > 1\) will always eventually overtake any linear function, no matter how large the linear function's starting value or rate. When two data points show a constant difference, a linear model fits; when they show a constant ratio, an exponential model fits. This is why a phrase like "grows by 5 people per year" points to a linear model, while "grows by 5% per year" points to an exponential one.

!!! mascot-tip "Helpful Hint"
    ![Sage giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    To decide which model fits a table of data, test both operations: subtract consecutive outputs, then divide them. Whichever operation gives you the *same* result every time tells you which model to use!

## Graphing Exponentials

To graph \(f(x) = a \cdot b^x\), plot the initial value \((0, a)\), then multiply by \(b\) repeatedly to find more points, connecting them with a smooth curve that approaches the asymptote \(y = 0\) but never crosses it. When \(b > 1\), the curve rises from left to right, staying close to the x-axis on the left and rising steeply on the right. When \(0 < b < 1\), the curve falls from left to right, starting high on the left and flattening toward the x-axis on the right. A larger \(a\) shifts every point higher without changing the curve's overall shape. A quick way to check a hand-drawn graph is to confirm it never crosses the asymptote and always stays on one side of the x-axis, since \(b^x\) is never zero or negative for any real value of \(x\) when \(b>0\).

## Applications of Systems

Comparing two exponential models, or an exponential model against a linear one, often means solving a system: setting the two expressions equal and finding where they intersect, much like the systems of equations from Chapter 10. For example, one savings plan modeled by \(A(x) = 500 \cdot (1.05)^x\) and another by \(B(x) = 400 \cdot (1.08)^x\) can be compared by graphing both curves and finding the input \(x\) where they cross, which tells you exactly when the second plan overtakes the first — a natural extension of solving systems with new, curved equations. This kind of comparison is common when choosing between two real financial or scientific options: the one with the smaller starting value but larger growth factor will often win out eventually, even if it looks worse at first — exactly the kind of insight a system of two exponential equations can reveal.

---

!!! mascot-celebration "Great Work!"
    ![Sage celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You figured it out! You can now tell exponential functions apart from linear ones, build growth and decay models from real situations, and read the key features straight off an equation or a graph. Exponential thinking will keep showing up — in science, finance, and beyond — and you are ready for it.

---
## Word Count Report

| Concept | Approx. words written | Target |
|---|---|---|
| Exponential Function | 1334 | 1307 |
| Exponential Growth | 770 | 803 |
| Exponential Decay | 522 | 562 |
| Growth Factor | 154 | 150 |
| Decay Factor | 134 | 150 |
| Initial Value | 151 | 150 |
| Exponential Models | 143 | 150 |
| Comparing Linear and Exponential | 142 | 150 |
| Graphing Exponentials | 143 | 150 |
| Applications of Systems | 145 | 150 |
| **Total** | **~3638** | **3722** |
