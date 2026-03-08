var BOOK_DATA = {
    id: "thinking-fast-and-slow",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    subtitle: "How Two Systems of Thought Shape Our Judgments and Decisions",
    chapters: [
        // ==============================
        // CHAPTER 1
        // ==============================
        {
            number: 1,
            title: "Two Systems",
            isAppendix: false,
            summary: "<p>Kahneman introduces the two protagonists of the book: <strong>System 1</strong> and <strong>System 2</strong>. System 1 operates automatically and quickly, with little or no effort and no sense of voluntary control. It is the system that detects hostility in a voice, completes the phrase &ldquo;bread and ___,&rdquo; and drives a car on an empty road. System 2 allocates attention to effortful mental activities, including complex computations, and is associated with the subjective experience of agency, choice, and concentration.</p><p>The two systems work together, with System 1 continuously generating suggestions for System 2: impressions, intuitions, intentions, and feelings. When System 1 runs into difficulty, it calls on System 2 for more detailed processing. System 2 is activated when an event is detected that violates the model of the world that System 1 maintains.</p><p>The central insight is that most of what we think and do originates in System 1, but System 2 takes over when things get difficult. However, System 2 is lazy&mdash;it often endorses System 1&rsquo;s suggestions with little scrutiny. This division of labour is normally efficient, but it leads to systematic errors in judgment and decision-making that form the subject of the entire book.</p>",
            keyPoints: [
                "System 1: fast, automatic, intuitive, always running",
                "System 2: slow, deliberate, effortful, and lazy",
                "Most thought and behaviour originates in System 1",
                "System 2 often endorses System 1's suggestions without scrutiny",
                "The interaction between the two systems produces systematic cognitive errors"
            ],
            realLifeExamples: [
                {
                    title: "The Bat and Ball Problem",
                    content: "<p>A bat and ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost? Most people immediately answer 10 cents (System 1), but the correct answer is 5 cents (which requires System 2 to check). This simple puzzle demonstrates how System 1 generates confident but incorrect answers that System 2 fails to verify.</p>"
                }
            ],
            quotes: [
                {
                    text: "A reliable way to make people believe in falsehoods is frequent repetition, because familiarity is not easily distinguished from truth.",
                    source: "Daniel Kahneman"
                }
            ],
            insights: [
                {
                    title: "The Laziness of System 2",
                    content: "<p>We like to think of ourselves as rational agents whose beliefs and decisions are based on careful reasoning. But Kahneman shows that our &lsquo;rational&rsquo; System 2 is fundamentally lazy. It requires effort and energy, and it would rather endorse System 1&rsquo;s quick answers than do the hard work of verification. This laziness is the root cause of most cognitive biases.</p>"
                }
            ],
            actionItems: [
                "When making important decisions, deliberately engage System 2 by slowing down and writing out your reasoning",
                "Practice solving the 'bat and ball' type problems to train yourself to check intuitive answers",
                "Notice when you are operating on autopilot and ask whether the situation warrants more careful thought",
                "Create decision-making checklists for important recurring decisions to force System 2 engagement"
            ],
            quiz: [
                {
                    question: "What characterises System 1 thinking?",
                    options: ["Slow, deliberate, and effortful", "Fast, automatic, and intuitive", "Activated only during emergencies", "Primarily logical and analytical"],
                    correctIndex: 1,
                    explanation: "System 1 operates automatically and quickly with little effort or sense of voluntary control."
                },
                {
                    question: "In the bat and ball problem, why do most people answer incorrectly?",
                    options: ["They cannot do math", "System 1 generates a quick intuitive answer and System 2 fails to check it", "The problem is unsolvable", "They were not paying attention"],
                    correctIndex: 1,
                    explanation: "System 1 immediately suggests 10 cents, and lazy System 2 endorses this answer without doing the arithmetic to verify it."
                },
                {
                    question: "Why is System 2 described as 'lazy'?",
                    options: ["It never works", "It requires effort and prefers to endorse System 1's suggestions", "It only works during sleep", "It is incapable of complex thought"],
                    correctIndex: 1,
                    explanation: "System 2 requires mental effort and energy, so it tends to accept System 1's quick answers rather than investing the effort to verify them."
                }
            ],
            mindMap: {
                central: "Two Systems of Thought",
                branches: [
                    { label: "System 1", children: ["Fast and automatic", "Intuitive", "Always running", "Generates impressions"] },
                    { label: "System 2", children: ["Slow and deliberate", "Effortful", "Lazy", "Monitors System 1"] },
                    { label: "Interaction", children: ["S1 suggests, S2 endorses", "S2 activated by difficulty", "Efficient but error-prone"] }
                ]
            }
        },
        // ==============================
        // CHAPTER 2
        // ==============================
        {
            number: 2,
            title: "Attention and Effort",
            isAppendix: false,
            summary: "<p>Kahneman explores the relationship between mental effort and attention. System 2 activities require attention and are disrupted when attention is drawn away. He introduces the concept of <strong>cognitive load</strong>&mdash;the amount of mental effort a task requires&mdash;and shows that when cognitive load is high, System 2 becomes less effective and System 1 takes over more of our thinking.</p><p>Research on pupil dilation provides a physical marker of mental effort. When people engage in demanding cognitive tasks (like multiplying two-digit numbers), their pupils dilate measurably. As the task gets harder, pupils widen further. When the task exceeds cognitive capacity, people give up and pupils contract. This physiological response gives researchers an objective measure of mental effort.</p><p>The practical implication is that we have a limited budget of attention. When that budget is consumed by one task, other tasks suffer. This is why talking on a phone while driving is dangerous&mdash;not because your hands are occupied, but because your cognitive budget is consumed by the conversation, leaving less for the driving task that needs it.</p>",
            keyPoints: [
                "Mental effort is a limited resource that gets depleted with use",
                "Pupil dilation provides an objective measure of cognitive effort",
                "High cognitive load causes System 2 to weaken and System 1 to dominate",
                "Attention is a finite budget: spending it on one task reduces availability for others",
                "Phone conversations while driving are dangerous because of cognitive load, not hand occupation"
            ],
            realLifeExamples: [
                {
                    title: "The Add-1 Task",
                    content: "<p>Participants hear a sequence of digits (e.g., 5-3-8-7) and must add 1 to each digit and report the result (6-4-9-8). This simple-sounding task consumes enormous cognitive resources. Pupils dilate significantly, heart rate increases, and the ability to notice peripheral events drops dramatically.</p>"
                }
            ],
            quotes: [
                {
                    text: "The often-used phrase 'pay attention' is apt: you dispose of a limited budget of attention that you can allocate to activities, and if you try to go beyond your budget, you will fail.",
                    source: "Daniel Kahneman"
                }
            ],
            insights: [
                {
                    title: "Cognitive Load Management",
                    content: "<p>Understanding that attention is a finite resource has profound implications for productivity and decision-making. Important tasks should be tackled when cognitive resources are fresh, not depleted. Environmental distractions consume cognitive budget even when we think we are ignoring them. The most productive approach is to protect your cognitive resources for the tasks that matter most.</p>"
                }
            ],
            actionItems: [
                "Schedule your most important decisions and creative work for times when your cognitive resources are freshest",
                "Eliminate distractions during deep work to conserve your attention budget",
                "Avoid making important decisions when cognitively depleted (hungry, tired, stressed)",
                "Never have phone conversations while driving&mdash;use the cognitive budget for safety"
            ],
            quiz: [
                {
                    question: "What does pupil dilation indicate during cognitive tasks?",
                    options: ["The person is lying", "The level of mental effort being exerted", "The person is bored", "The person is happy"],
                    correctIndex: 1,
                    explanation: "Research shows that pupils dilate in proportion to the mental effort required by a task, providing an objective physiological measure of cognitive load."
                },
                {
                    question: "Why is talking on a phone while driving dangerous?",
                    options: ["Because one hand is on the phone", "Because the conversation consumes cognitive resources needed for driving", "Because the phone is distracting to look at", "Because phone signals interfere with car electronics"],
                    correctIndex: 1,
                    explanation: "The danger comes from the cognitive load of the conversation consuming the limited attention budget, leaving fewer resources for the complex task of driving."
                }
            ],
            mindMap: {
                central: "Attention and Effort",
                branches: [
                    { label: "Cognitive Load", children: ["Limited resource", "Depletes with use", "Affects System 2 performance"] },
                    { label: "Measurement", children: ["Pupil dilation", "Heart rate", "Objective indicators"] },
                    { label: "Implications", children: ["Protect peak hours", "Eliminate distractions", "Don't drive and talk"] }
                ]
            }
        },
        // ==============================
        // CHAPTER 3
        // ==============================
        {
            number: 3,
            title: "Heuristics and Biases",
            isAppendix: false,
            summary: "<p>Kahneman introduces the heuristics that System 1 uses to make quick judgments&mdash;mental shortcuts that usually work well but sometimes lead to systematic errors. The most important heuristics are <strong>availability</strong> (judging probability by how easily examples come to mind), <strong>representativeness</strong> (judging probability by similarity to stereotypes), and <strong>anchoring</strong> (being influenced by irrelevant numbers presented before a judgment).</p><p>The availability heuristic explains why people overestimate the risk of dramatic events like plane crashes and underestimate the risk of common killers like heart disease. Plane crashes are vivid and memorable, making examples readily available in memory. Heart disease deaths are ordinary and forgettable. Our judgment of risk is driven not by statistics but by the ease of recall.</p><p>The representativeness heuristic leads us to ignore base rates. When told that Steve is shy, tidy, and detail-oriented, people judge him as more likely to be a librarian than a farmer, ignoring the fact that there are twenty times more farmers than librarians. System 1 matches Steve to the stereotype and ignores the statistical reality.</p>",
            keyPoints: [
                "Heuristics are mental shortcuts that usually work but produce systematic errors",
                "Availability heuristic: judging probability by ease of recall",
                "Representativeness heuristic: judging by similarity to stereotypes while ignoring base rates",
                "Anchoring effect: irrelevant numbers influence subsequent judgments",
                "These biases are built into System 1 and operate automatically"
            ],
            realLifeExamples: [
                {
                    title: "The Steve Problem",
                    content: "<p>When people hear that Steve is &lsquo;meek, tidy, and has a need for order and structure,&rsquo; they judge him far more likely to be a librarian than a farmer. But the base rate of male farmers in America is roughly twenty times higher than male librarians. System 1 matches to the stereotype and ignores the statistics.</p>"
                },
                {
                    title: "Anchoring in Negotiations",
                    content: "<p>In experiments, real estate agents asked to assess a house&rsquo;s value were strongly influenced by the listed price, even though they denied it. Those shown a higher listing price estimated the house was worth significantly more than those shown a lower listing price for the same property. The initial number anchored their judgment.</p>"
                }
            ],
            quotes: [
                {
                    text: "Nothing in life is as important as you think it is, while you are thinking about it.",
                    source: "Daniel Kahneman"
                }
            ],
            insights: [
                {
                    title: "Base Rate Neglect",
                    content: "<p>One of the most consequential biases is our tendency to ignore base rates&mdash;the statistical frequency of events in the general population. We are seduced by vivid individual stories and stereotypical matches while ignoring the cold mathematical reality. This bias affects medical diagnoses, hiring decisions, criminal justice, and everyday judgment.</p>"
                }
            ],
            actionItems: [
                "Before making a probability judgment, ask yourself: what is the base rate?",
                "When you feel certain about a risk, check whether your certainty comes from statistics or from vivid examples",
                "In negotiations, be aware of anchoring and set your own anchor first",
                "Challenge stereotypical thinking by actively considering statistical evidence"
            ],
            quiz: [
                {
                    question: "What is the availability heuristic?",
                    options: ["Judging probability by statistical analysis", "Judging probability by how easily examples come to mind", "Judging by the quality of available data", "Judging by the availability of experts"],
                    correctIndex: 1,
                    explanation: "The availability heuristic leads us to judge the probability of events by how easily examples come to mind, which biases us towards vivid, recent, or dramatic events."
                },
                {
                    question: "Why do people judge Steve as more likely a librarian than a farmer?",
                    options: ["Because there are more librarians", "Because they use the representativeness heuristic and ignore base rates", "Because Steve said he is a librarian", "Because farming is rare"],
                    correctIndex: 1,
                    explanation: "People match Steve's description to the librarian stereotype (representativeness) while ignoring the base rate reality that there are far more farmers than librarians."
                },
                {
                    question: "How does anchoring affect real estate valuations?",
                    options: ["It has no effect on professionals", "The listing price anchors agents' estimates even though they deny being influenced", "Agents always ignore listing prices", "Anchoring only affects buyers, not agents"],
                    correctIndex: 1,
                    explanation: "Even experienced real estate agents are significantly influenced by the initial listing price, estimating higher values when shown higher listing prices for the same property."
                }
            ],
            mindMap: {
                central: "Heuristics and Biases",
                branches: [
                    { label: "Availability", children: ["Ease of recall", "Overestimate dramatic risks", "Underestimate common risks"] },
                    { label: "Representativeness", children: ["Stereotype matching", "Base rate neglect", "Steve problem"] },
                    { label: "Anchoring", children: ["Irrelevant numbers influence", "Real estate valuations", "Negotiation strategy"] }
                ]
            }
        },
        // ==============================
        // CHAPTER 4
        // ==============================
        {
            number: 4,
            title: "Overconfidence",
            isAppendix: false,
            summary: "<p>Kahneman dedicates significant attention to <strong>overconfidence</strong>, which he considers the most significant cognitive bias. Experts and laypeople alike are systematically overconfident in their judgments. Studies show that when people say they are &ldquo;99% certain,&rdquo; they are wrong about 40% of the time. This overconfidence is not a character flaw&mdash;it is a built-in feature of System 1 thinking.</p><p>Overconfidence stems from the brain&rsquo;s tendency to construct coherent stories from limited information. System 1 excels at building narratives that make sense, and the coherence of the story feels like evidence for its truth. Kahneman calls this <strong>WYSIATI</strong>&mdash;&ldquo;What You See Is All There Is.&rdquo; The brain does not consider the information it does not have; it makes the best story possible from available data and believes it wholeheartedly.</p><p>The chapter examines why experts are often no better than chance at prediction in complex domains. Political pundits, stock analysts, and long-range economic forecasters consistently fail to outperform simple algorithms or random chance, yet they maintain supreme confidence in their predictions. In &ldquo;low-validity environments&rdquo;&mdash;where the relationship between information and outcomes is weak and noisy&mdash;expert intuition is essentially worthless.</p>",
            keyPoints: [
                "Overconfidence is the most significant cognitive bias and is built into System 1",
                "When people are '99% certain,' they are wrong about 40% of the time",
                "WYSIATI: the brain builds coherent stories from limited information and treats them as complete",
                "Expert predictions in complex domains often fail to outperform chance",
                "The coherence of a narrative feels like evidence for its truth, but it is not"
            ],
            realLifeExamples: [
                {
                    title: "Philip Tetlock's Expert Study",
                    content: "<p>Political scientist Philip Tetlock tracked 80,000 predictions by 284 political and economic experts over two decades. The experts performed only slightly better than random chance&mdash;and worse than simple algorithms. Yet they maintained high confidence in their predictions and always had plausible explanations for why their wrong predictions were actually almost right.</p>"
                }
            ],
            quotes: [
                {
                    text: "We are prone to overestimate how much we understand about the world and to underestimate the role of chance in events.",
                    source: "Daniel Kahneman"
                }
            ],
            insights: [
                {
                    title: "The Illusion of Understanding",
                    content: "<p>We believe we understand the past, which gives us confidence that we can predict the future. But our understanding of the past is largely an illusion&mdash;we construct neat narratives that explain what happened, ignoring the randomness and complexity that actually drove events. This hindsight bias fuels our overconfidence about foresight.</p>"
                }
            ],
            actionItems: [
                "When you feel very confident about a prediction, deliberately consider what information you might be missing",
                "Use pre-mortems: before making a decision, imagine it has failed and ask why",
                "Seek out base rates and statistical evidence rather than relying on narrative coherence",
                "Track your predictions over time to calibrate your actual accuracy against your felt confidence"
            ],
            quiz: [
                {
                    question: "What does WYSIATI stand for?",
                    options: ["What You See Is All There Is", "When You See It, Act Thoughtfully Immediately", "Why You Should Investigate All Theories Initially", "What Your Senses Indicate As True Information"],
                    correctIndex: 0,
                    explanation: "WYSIATI (What You See Is All There Is) describes the brain's tendency to build complete narratives from available information while ignoring what it doesn't know."
                },
                {
                    question: "How did expert political predictions compare to random chance?",
                    options: ["Far better than chance", "Only slightly better than chance, and worse than simple algorithms", "Exactly the same as chance", "Experts never make predictions"],
                    correctIndex: 1,
                    explanation: "Tetlock's study of 80,000 expert predictions found they were barely better than chance and consistently worse than simple statistical algorithms."
                }
            ],
            mindMap: {
                central: "Overconfidence",
                branches: [
                    { label: "WYSIATI", children: ["Limited information used", "Coherent stories constructed", "Missing data ignored"] },
                    { label: "Expert Failure", children: ["Tetlock's study", "Worse than algorithms", "Plausible excuses for failures"] },
                    { label: "Remedies", children: ["Pre-mortems", "Track predictions", "Seek base rates"] }
                ]
            }
        },
        // ==============================
        // CHAPTER 5
        // ==============================
        {
            number: 5,
            title: "Choices",
            isAppendix: false,
            summary: "<p>Kahneman examines how framing&mdash;the way a choice is presented&mdash;dramatically affects decisions. The same objective information leads to different choices depending on whether it is framed as a gain or a loss. A medical treatment described as having a &ldquo;90% survival rate&rdquo; is far more popular than one described as having a &ldquo;10% mortality rate,&rdquo; even though they are mathematically identical.</p><p>This framing effect reveals that people do not evaluate outcomes in absolute terms but relative to a reference point. Our choices are driven not by the final state of affairs but by whether outcomes represent gains or losses relative to where we are now. This is a fundamental departure from classical economic theory, which assumes people make rational choices based on final outcomes.</p><p>Kahneman also introduces the concept of <strong>narrow framing</strong>&mdash;making decisions one at a time rather than considering them as part of a larger portfolio. People who evaluate each bet or investment individually make more conservative choices than those who consider all their decisions together. Narrow framing leads to excessive risk aversion in domains where some risk-taking would be optimal.</p>",
            keyPoints: [
                "Framing effects: identical information leads to different decisions based on presentation",
                "People evaluate outcomes relative to reference points, not in absolute terms",
                "'90% survival rate' and '10% mortality rate' produce different medical decisions",
                "Narrow framing (one decision at a time) leads to excessive risk aversion",
                "Classical economic theory's assumption of rational choice is empirically wrong"
            ],
            realLifeExamples: [
                {
                    title: "The Asian Disease Problem",
                    content: "<p>Participants were told 600 people would die from a disease. Programme A would save 200 lives for certain. Programme B had a 1/3 chance of saving all 600 and a 2/3 chance of saving none. When framed as lives saved, 72% chose the certain option. When the identical choices were reframed as deaths, the majority switched to the risky option. Same math, different frame, different choice.</p>"
                }
            ],
            quotes: [
                {
                    text: "An investment said to have an 80% chance of success sounds far more attractive than one with a 20% chance of failure. The mind can't easily recognize that they are the same.",
                    source: "Daniel Kahneman"
                }
            ],
            insights: [
                {
                    title: "Reference Point Dependency",
                    content: "<p>Our entire system of evaluating outcomes is built on comparisons to reference points, not absolute values. A salary of $80,000 feels wonderful if you expected $60,000 and terrible if you expected $100,000. This reference-dependent evaluation means that happiness and satisfaction are about expectations and framing as much as about objective reality.</p>"
                }
            ],
            actionItems: [
                "When making decisions, reframe the choice in multiple ways to check if your preference changes",
                "Be wary of how options are presented to you&mdash;marketers and politicians use framing strategically",
                "Consider decisions as part of a broader portfolio rather than in isolation",
                "Ask: would my choice change if this were framed as a loss rather than a gain?"
            ],
            quiz: [
                {
                    question: "What is a framing effect?",
                    options: ["When the frame of a picture affects art perception", "When identical information leads to different decisions based on how it is presented", "When people always choose the first option presented", "When decisions improve with more information"],
                    correctIndex: 1,
                    explanation: "Framing effects occur when the same objective information produces different choices depending on whether it is presented as a gain or a loss, or in other ways."
                },
                {
                    question: "What is 'narrow framing'?",
                    options: ["Using a narrow set of criteria", "Making decisions one at a time rather than as part of a portfolio", "Framing questions narrowly", "Focusing on one person's perspective"],
                    correctIndex: 1,
                    explanation: "Narrow framing means evaluating each decision in isolation rather than considering it as part of a larger portfolio, which leads to excessive risk aversion."
                }
            ],
            mindMap: {
                central: "Choices and Framing",
                branches: [
                    { label: "Framing Effects", children: ["Same info, different decisions", "Gain vs loss framing", "90% survival vs 10% mortality"] },
                    { label: "Reference Points", children: ["Outcomes judged relatively", "Expectations shape satisfaction", "Not absolute values"] },
                    { label: "Narrow Framing", children: ["One decision at a time", "Excessive risk aversion", "Portfolio thinking is better"] }
                ]
            }
        },
        // ==============================
        // CHAPTER 6
        // ==============================
        {
            number: 6,
            title: "Prospect Theory: Losses Loom Larger Than Gains",
            isAppendix: false,
            summary: "<p>Kahneman presents <strong>prospect theory</strong>, the work that won him the Nobel Prize. The central finding is that losses loom larger than equivalent gains&mdash;losing $100 feels roughly twice as painful as gaining $100 feels good. This <strong>loss aversion</strong> is one of the most robust findings in behavioural economics and explains a vast range of human behaviour.</p><p>Loss aversion explains why people hold onto losing investments, refuse to sell houses at a loss, and stay in bad relationships. The pain of crystallising a loss is so aversive that people prefer to endure ongoing disadvantage rather than accept a definitive loss. This also explains the endowment effect: once we own something, we value it more highly simply because losing it would feel like a loss.</p><p>Prospect theory also describes a distinctive pattern of risk attitudes. In the domain of gains, people are risk-averse (preferring a sure $900 over a 90% chance of $1,000). But in the domain of losses, people become risk-seeking (preferring a 90% chance of losing $1,000 over a sure loss of $900). This asymmetry explains phenomena from insurance purchasing to gambling behaviour.</p>",
            keyPoints: [
                "Loss aversion: losing $100 hurts roughly twice as much as gaining $100 feels good",
                "People are risk-averse in gains and risk-seeking in losses",
                "The endowment effect: we value things more once we own them because selling feels like a loss",
                "Loss aversion explains holding losing investments, bad relationships, and overvalued possessions",
                "Prospect theory replaced classical utility theory with a psychologically realistic model of choice"
            ],
            realLifeExamples: [
                {
                    title: "The Mug Experiment",
                    content: "<p>In a classic experiment, participants given a coffee mug demanded roughly twice as much to sell it as other participants were willing to pay to buy it. Owning the mug created an endowment effect: the pain of losing the mug exceeded the pleasure of gaining it, so sellers set higher prices than buyers were willing to pay.</p>"
                },
                {
                    title: "Holding Losing Stocks",
                    content: "<p>Investors sell winning stocks too quickly (to lock in gains) and hold losing stocks too long (to avoid the pain of crystallising a loss). This &lsquo;disposition effect&rsquo; is one of the most costly consequences of loss aversion, as it leads to portfolios that underperform the market.</p>"
                }
            ],
            quotes: [
                {
                    text: "The concept of loss aversion is certainly the most significant contribution of psychology to behavioral economics.",
                    source: "Daniel Kahneman"
                }
            ],
            insights: [
                {
                    title: "The 2x Pain of Loss",
                    content: "<p>The approximately 2:1 ratio of loss pain to gain pleasure has been replicated across cultures, age groups, and types of decisions. It is not a quirk of particular individuals; it appears to be a deep feature of human psychology, likely evolved because in ancestral environments, losses (losing food, territory, shelter) were more dangerous than equivalent gains were beneficial.</p>"
                }
            ],
            actionItems: [
                "Before deciding to hold onto a losing investment, ask: if I didn't own this, would I buy it at the current price?",
                "Recognise the endowment effect when selling possessions and try to evaluate them as a buyer would",
                "When making risk decisions, check whether your risk preference changes between gain and loss frames",
                "Use loss aversion constructively: frame goals in terms of what you will lose by not acting"
            ],
            quiz: [
                {
                    question: "What is loss aversion?",
                    options: ["People avoid all risk", "Losses feel roughly twice as painful as equivalent gains feel good", "People are afraid of losing arguments", "People avoid financial discussions"],
                    correctIndex: 1,
                    explanation: "Loss aversion describes the robust finding that the psychological pain of losing something is approximately twice the pleasure of gaining the same thing."
                },
                {
                    question: "What is the endowment effect?",
                    options: ["People value inherited money more", "People value things more once they own them because selling feels like a loss", "People prefer expensive items", "People donate more to endowments"],
                    correctIndex: 1,
                    explanation: "The endowment effect is the tendency to value things more highly once we own them, because parting with them triggers loss aversion."
                }
            ],
            mindMap: {
                central: "Prospect Theory",
                branches: [
                    { label: "Loss Aversion", children: ["2:1 loss-to-gain ratio", "Universal finding", "Evolutionary basis"] },
                    { label: "Risk Patterns", children: ["Risk-averse in gains", "Risk-seeking in losses", "Asymmetric behaviour"] },
                    { label: "Endowment Effect", children: ["Own = value more", "Mug experiment", "Selling > buying price"] },
                    { label: "Applications", children: ["Investment behaviour", "Negotiations", "Marketing"] }
                ]
            }
        },
        // ==============================
        // CHAPTER 7
        // ==============================
        {
            number: 7,
            title: "The Planning Fallacy",
            isAppendix: false,
            summary: "<p>Kahneman addresses the <strong>planning fallacy</strong>&mdash;the systematic tendency to underestimate the time, costs, and risks of future actions while overestimating their benefits. This bias affects individuals, corporations, and governments alike. Home renovations routinely cost twice the estimate. Software projects regularly take three times longer than planned. Major infrastructure projects go billions over budget.</p><p>The planning fallacy occurs because people plan based on the <strong>inside view</strong>&mdash;focusing on the specific details of their project and constructing optimistic scenarios of how it will unfold. They ignore the <strong>outside view</strong>&mdash;the statistical base rate of how similar projects have actually turned out. The inside view generates optimistic narratives; the outside view provides sobering statistics.</p><p>Kahneman recommends &ldquo;reference class forecasting&rdquo; as a remedy: identifying a relevant class of similar past projects and using their actual outcomes as the baseline for your prediction. This approach was developed by Bent Flyvbjerg, who found that it dramatically improves the accuracy of project forecasts by replacing narrative optimism with statistical reality.</p>",
            keyPoints: [
                "The planning fallacy causes systematic underestimation of time, costs, and risks",
                "Inside view (project-specific optimism) vs outside view (base rates of similar projects)",
                "Home renovations, software projects, and infrastructure routinely exceed estimates",
                "Reference class forecasting uses outcomes of similar past projects to improve predictions",
                "Optimistic planning is reinforced by WYSIATI: we focus on our plan and ignore what could go wrong"
            ],
            realLifeExamples: [
                {
                    title: "The Scottish Parliament Building",
                    content: "<p>The Scottish Parliament building was initially estimated to cost &pound;40 million. By completion, it cost &pound;431 million&mdash;more than ten times the original estimate. This dramatic overrun exemplifies the planning fallacy operating at the governmental level, where optimistic inside-view planning met the reality of complex construction.</p>"
                }
            ],
            quotes: [
                {
                    text: "The prevalent tendency to underweight or ignore distributional information is perhaps the major source of error in forecasting.",
                    source: "Daniel Kahneman"
                }
            ],
            insights: [
                {
                    title: "Inside View vs Outside View",
                    content: "<p>The inside view feels natural and compelling because it is based on specific knowledge of our unique situation. The outside view feels irrelevant because other projects are &lsquo;different from ours.&rsquo; But statistically, the outside view is almost always more accurate. The key insight: your project is probably not as unique as you think it is.</p>"
                }
            ],
            actionItems: [
                "For any project estimate, research how long similar projects actually took and use that as your baseline",
                "Add a significant buffer to all time and cost estimates (50-100% for complex projects)",
                "Practice reference class forecasting: what is the base rate of success for projects like this?",
                "Use pre-mortems to identify specific risks you might be ignoring in your optimistic plan"
            ],
            quiz: [
                {
                    question: "What causes the planning fallacy?",
                    options: ["Lack of intelligence", "Using the optimistic inside view rather than the statistical outside view", "Not having enough data", "Being too cautious"],
                    correctIndex: 1,
                    explanation: "The planning fallacy occurs because people plan based on the optimistic inside view (their specific plan) rather than the outside view (how similar projects actually turned out)."
                },
                {
                    question: "What is reference class forecasting?",
                    options: ["Forecasting based on your feelings", "Using outcomes of similar past projects as the baseline for predictions", "Asking experts for their opinions", "Using the best-case scenario as the estimate"],
                    correctIndex: 1,
                    explanation: "Reference class forecasting involves identifying a class of similar past projects and using their actual outcomes to ground your predictions in statistical reality."
                }
            ],
            mindMap: {
                central: "The Planning Fallacy",
                branches: [
                    { label: "The Problem", children: ["Underestimate time/cost", "Overestimate benefits", "Affects everyone"] },
                    { label: "Inside View", children: ["Focus on specifics", "Optimistic scenarios", "Feels compelling"] },
                    { label: "Outside View", children: ["Base rates", "Similar projects", "Statistically accurate"] },
                    { label: "Solution", children: ["Reference class forecasting", "Add buffers", "Pre-mortems"] }
                ]
            }
        },
        // ==============================
        // CHAPTER 8
        // ==============================
        {
            number: 8,
            title: "The Illusion of Validity and Expert Intuition",
            isAppendix: false,
            summary: "<p>Kahneman explores the conditions under which expert intuition can be trusted and when it cannot. He and Gary Klein reached a surprising agreement: expert intuition is valid only in environments that are <strong>regular enough to be predictable</strong> and where the expert has had <strong>prolonged practice with feedback</strong>. A chess master&rsquo;s intuition is trustworthy; a stock picker&rsquo;s is not.</p><p>In high-validity environments (chess, firefighting, medicine with clear symptoms), experts develop genuine pattern recognition through thousands of hours of practice with clear feedback. Their System 1 has truly learned. But in low-validity environments (stock markets, long-range political forecasting, complex economic predictions), the environment is too noisy and unpredictable for genuine learning to occur.</p><p>The illusion of validity is the subjective feeling of confidence that accompanies both valid and invalid intuitions. Experts in low-validity domains feel just as confident as those in high-validity domains, even though their predictions are essentially worthless. The confidence is driven by the coherence of the narrative System 1 constructs, not by actual predictive accuracy.</p>",
            keyPoints: [
                "Expert intuition is valid only in regular, predictable environments with prolonged practice and feedback",
                "Chess and firefighting allow valid expert intuition; stock picking and political forecasting do not",
                "The illusion of validity: subjective confidence does not correlate with predictive accuracy",
                "Low-validity environments are too noisy for genuine pattern learning",
                "Simple algorithms often outperform expert judgment in complex domains"
            ],
            realLifeExamples: [
                {
                    title: "Chess Masters vs Stock Pickers",
                    content: "<p>Chess masters can glance at a board and immediately see the best move because chess is a high-validity environment with clear rules and rapid feedback. Stock pickers, despite equal confidence in their intuitions, perform no better than chance because the stock market is a low-validity environment where the relationship between available information and outcomes is too weak and noisy for pattern learning.</p>"
                }
            ],
            quotes: [
                {
                    text: "The illusion that we understand the past fosters overconfidence in our ability to predict the future.",
                    source: "Daniel Kahneman"
                }
            ],
            insights: [
                {
                    title: "When to Trust Your Gut",
                    content: "<p>The practical question is not whether to trust intuition in general but whether the specific domain allows for valid intuition. Ask two questions: (1) Is the environment regular and predictable enough for patterns to exist? (2) Have I had enough practice with feedback to learn those patterns? If either answer is no, rely on algorithms, checklists, and data rather than gut feelings.</p>"
                }
            ],
            actionItems: [
                "Before trusting your intuition on a decision, assess whether the domain is high-validity or low-validity",
                "In low-validity domains, use structured decision-making frameworks rather than gut feelings",
                "Recognise that confidence is not evidence of accuracy&mdash;it may just be WYSIATI",
                "Where possible, use simple algorithms or scoring systems to supplement or replace expert judgment"
            ],
            quiz: [
                {
                    question: "Under what conditions is expert intuition valid?",
                    options: ["Whenever the expert feels confident", "In regular environments with prolonged practice and feedback", "In any domain with high stakes", "When the expert has credentials"],
                    correctIndex: 1,
                    explanation: "Expert intuition is valid only when the environment is regular enough for patterns to exist and the expert has had sufficient practice with clear feedback to learn those patterns."
                },
                {
                    question: "Why do stock pickers' intuitions fail despite their confidence?",
                    options: ["They are not smart enough", "The stock market is a low-validity environment too noisy for pattern learning", "They don't practice enough", "They use the wrong data"],
                    correctIndex: 1,
                    explanation: "The stock market is a low-validity environment where the relationship between available information and outcomes is too weak and noisy for genuine pattern recognition to develop."
                }
            ],
            mindMap: {
                central: "Expert Intuition",
                branches: [
                    { label: "Valid Intuition", children: ["Regular environment", "Clear feedback", "Chess, firefighting, medicine"] },
                    { label: "Invalid Intuition", children: ["Noisy environment", "Weak patterns", "Stock picking, forecasting"] },
                    { label: "Illusion of Validity", children: ["Confidence ≠ accuracy", "WYSIATI-driven", "Experts equally confident in both"] }
                ]
            }
        },
        // ==============================
        // CHAPTER 9
        // ==============================
        {
            number: 9,
            title: "Utility and Happiness",
            isAppendix: false,
            summary: "<p>Kahneman explores the disconnect between experienced happiness and remembered happiness. He introduces the distinction between the <strong>experiencing self</strong> (which lives life moment by moment) and the <strong>remembering self</strong> (which constructs the story of life). These two selves often disagree about what constitutes a good experience, and it is the remembering self that makes our decisions.</p><p>The remembering self is governed by the <strong>peak-end rule</strong>: it evaluates an experience based on how it felt at its most intense moment (peak) and at the end, largely ignoring duration. A colonoscopy patient who experienced less peak pain and a gentle ending remembered the procedure more favourably than one who experienced the same total pain but with a worse ending&mdash;even if the first procedure lasted twice as long.</p><p>This has profound implications for how we design our lives. We tend to make decisions based on how we will remember experiences rather than how we will actually experience them. A two-week holiday is remembered almost identically to a one-week holiday, suggesting the second week adds experienced happiness but almost no remembered happiness. We optimise for memories rather than moments.</p>",
            keyPoints: [
                "The experiencing self lives in the moment; the remembering self constructs the narrative",
                "The peak-end rule: experiences are judged by their peak intensity and ending, not duration",
                "Duration neglect: how long an experience lasts barely affects how it is remembered",
                "We make decisions based on anticipated memories, not anticipated experiences",
                "The remembering self dominates our choices, often at the expense of moment-to-moment happiness"
            ],
            realLifeExamples: [
                {
                    title: "The Cold Water Experiment",
                    content: "<p>Participants immersed one hand in 14&deg;C water for 60 seconds. In a second trial, the same hand was immersed for 60 seconds at 14&deg;C followed by 30 seconds where the water was warmed slightly to 15&deg;C. When asked which trial to repeat, most chose the longer, second trial&mdash;because the slightly warmer ending made the remembering self evaluate it more favourably, even though it involved more total suffering.</p>"
                }
            ],
            quotes: [
                {
                    text: "Odd as it may seem, I am my remembering self, and the experiencing self, who does my living, is like a stranger to me.",
                    source: "Daniel Kahneman"
                }
            ],
            insights: [
                {
                    title: "Designing for Two Selves",
                    content: "<p>Recognising the two selves creates a dilemma: should we optimise for moment-to-moment experience or for memory? Neither answer is clearly right. But awareness of the distinction allows us to make more informed choices. Sometimes we should invest in experiences with good peaks and endings (for memory); other times we should invest in sustained daily well-being (for the experiencing self).</p>"
                }
            ],
            actionItems: [
                "Consider whether important life decisions are serving your experiencing self or your remembering self",
                "Design important experiences with strong endings, since that is what you will remember",
                "Invest in daily sources of happiness (short commute, good colleagues) that serve the experiencing self",
                "When evaluating past experiences, consciously consider duration rather than relying on peak-end memory"
            ],
            quiz: [
                {
                    question: "What is the peak-end rule?",
                    options: ["We remember the first and last parts of an experience", "We judge experiences by their peak intensity and ending, ignoring duration", "We only remember the end of experiences", "We remember the average intensity of experiences"],
                    correctIndex: 1,
                    explanation: "The peak-end rule states that the remembering self evaluates experiences based on their most intense moment and how they ended, largely ignoring how long they lasted."
                },
                {
                    question: "Why did participants choose the longer cold water trial?",
                    options: ["They liked cold water", "The slightly warmer ending made the remembering self evaluate it more favourably", "They miscounted the time", "The second trial was actually less cold"],
                    correctIndex: 1,
                    explanation: "The slightly warmer ending improved the memory of the experience, even though it involved more total suffering, demonstrating the peak-end rule."
                }
            ],
            mindMap: {
                central: "Two Selves",
                branches: [
                    { label: "Experiencing Self", children: ["Moment to moment", "Duration matters", "Does the living"] },
                    { label: "Remembering Self", children: ["Constructs narratives", "Peak-end rule", "Makes decisions"] },
                    { label: "Duration Neglect", children: ["Length barely matters", "Cold water study", "Holiday length"] },
                    { label: "Implications", children: ["Design good endings", "Invest in daily well-being", "Aware of which self to serve"] }
                ]
            }
        },
        // ==============================
        // CHAPTER 10
        // ==============================
        {
            number: 10,
            title: "Life as a Story and Two Selves",
            isAppendix: false,
            summary: "<p>In the concluding chapter, Kahneman brings together the themes of the book and reflects on their implications for how we live. The tension between System 1 and System 2, between experiencing and remembering, between intuition and statistics, runs through every aspect of human life. We cannot eliminate our biases, but we can become more aware of them and create systems that compensate for them.</p><p>Kahneman argues for what he calls &ldquo;adversarial collaboration&rdquo;&mdash;deliberately seeking out people who disagree with you and forcing your ideas to survive criticism. He also advocates for organisations to adopt decision-making procedures that reduce bias: checklists, algorithms, reference class forecasting, and structured decision processes. These tools do not replace human judgment but discipline it.</p><p>The chapter also addresses happiness research, showing that income increases happiness only up to about $75,000 per year (in 2010 dollars), after which additional income improves life evaluation but not daily emotional experience. This distinction between life satisfaction (remembering self) and emotional well-being (experiencing self) is one of the book&rsquo;s most practically important findings.</p>",
            keyPoints: [
                "We cannot eliminate biases but can create systems that compensate for them",
                "Adversarial collaboration: deliberately seek disagreement to improve thinking",
                "Income increases emotional well-being only up to about $75,000/year",
                "Above $75,000, income improves life evaluation but not daily happiness",
                "Organisations should adopt structured decision-making to reduce bias"
            ],
            realLifeExamples: [
                {
                    title: "Income and Happiness Research",
                    content: "<p>Kahneman and Deaton&rsquo;s research analysed 450,000 responses and found that emotional well-being (daily mood, stress, enjoyment) increases with income up to about $75,000 per year, then plateaus. Life evaluation (overall assessment of one&rsquo;s life) continues to rise with income. People earning $300,000 rate their lives better but do not feel better on a daily basis than those earning $75,000.</p>"
                }
            ],
            quotes: [
                {
                    text: "The confidence that people have in their beliefs is not a measure of the quality of evidence but of the coherence of the story the mind has managed to construct.",
                    source: "Daniel Kahneman"
                }
            ],
            insights: [
                {
                    title: "Systems Over Willpower",
                    content: "<p>The lesson of the entire book is that we should not trust ourselves to think clearly under pressure. Instead, we should build systems&mdash;checklists, algorithms, decision frameworks, feedback loops&mdash;that force clear thinking even when our natural cognitive biases are pulling us off course. The goal is not to become unbiased (impossible) but to create an environment where our biases do less damage.</p>"
                }
            ],
            actionItems: [
                "Identify the two or three most consequential biases in your professional life and implement specific countermeasures",
                "Build decision-making checklists for recurring important decisions",
                "Seek out people who disagree with you and engage in structured disagreement",
                "If you earn above the happiness threshold, invest additional income in time-saving and experiences rather than material goods",
                "Teach the concepts of System 1/System 2, loss aversion, and framing effects to your team"
            ],
            quiz: [
                {
                    question: "At what income level does emotional well-being plateau?",
                    options: ["$30,000/year", "$75,000/year", "$150,000/year", "$500,000/year"],
                    correctIndex: 1,
                    explanation: "Kahneman and Deaton found that daily emotional well-being increases with income up to about $75,000/year but does not improve with further increases."
                },
                {
                    question: "What is Kahneman's primary recommendation for dealing with cognitive biases?",
                    options: ["Try harder to think rationally", "Meditate daily", "Build systems and structures that compensate for biases", "Ignore biases since they are natural"],
                    correctIndex: 2,
                    explanation: "Kahneman advocates for creating systems (checklists, algorithms, structured decision-making) that compensate for biases rather than relying on willpower to overcome them."
                }
            ],
            mindMap: {
                central: "Living with Biases",
                branches: [
                    { label: "Systems", children: ["Checklists", "Algorithms", "Structured decisions", "Reference class forecasting"] },
                    { label: "Happiness", children: ["$75K threshold", "Life evaluation vs daily mood", "Experiences > material goods"] },
                    { label: "Collaboration", children: ["Seek disagreement", "Adversarial testing", "Survive criticism"] }
                ]
            }
        }
    ]
};
