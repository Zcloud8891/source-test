/* The Source Test — quiz data.
   Book quotations are taken word for word from the locked v4 manuscript
   at /workspace/book/synthetic-era/release-v4/manuscript/. See QUOTES.md. */
(function (root) {
  "use strict";

  var BOOK_URL = "https://dojostudios.gumroad.com/l/lxlyos";

  function bookUrl(typeSlug, placement) {
    var u = new URL(BOOK_URL);
    u.searchParams.set("utm_source", "source-test");
    u.searchParams.set("utm_medium", "quiz");
    u.searchParams.set("utm_campaign", "the-source-test");
    u.searchParams.set("utm_content", typeSlug || "site");
    u.searchParams.set("utm_term", placement || "cta");
    return u.toString();
  }

  var FILTER =
    "Is this deduction, intuition, or potentially corrupted borrowed history?";

  var GRADE_CARD = {
    question: "How do you know that to be true?",
    sortIntro: "Then sort the door.",
    filter: FILTER,
    ifBorrowed: "If it's borrowed, grade it.",
    criteria: [
      {
        name: "Chain",
        ask: "Who saw it, and who passed it on?",
        example:
          "your birthday. Your mother, a nurse, a clerk. You can name every link.",
      },
      {
        name: "Witnesses",
        ask: "Independent, or one source copied?",
        example:
          "the Maurice Jarre quote. It ran in obituaries on three continents. One student wrote it. One witness, seen again.",
      },
      {
        name: "Original",
        ask: "Is there a trace to check it against?",
        example:
          "the Lenin photo. The edit got caught because an uncut print survived.",
      },
      {
        name: "Fit",
        ask: "Does it hold up against what's already well established?",
        example:
          "the smoke by the Pentagon. The fire department and the Pentagon's own protection agency said there was no explosion.",
      },
    ],
    weigh:
      "Then weigh it. Build on it. Lean on it lightly. Mention it, labeled. Or set it aside until more comes in.",
    keep: "Keep it by the screen.",
    first: "First, the question.",
    epigraph: "Trust proportional to the grade you can still inspect",
    epigraphFrom: "The Black Box",
  };

  var TYPES = {
    borrower: {
      slug: "borrower",
      name: "The Borrower",
      oneLine: "You take what's handed over, and treat the handoff as the check.",
      read:
        "Most of what anyone knows arrives this way: a parent, a map, a screen. Borrowing is normal. The trouble starts when the handoff itself feels like proof. Before you build on it, ask who saw it, and who passed it on.",
      skips: {
        name: "Chain",
        ask: "Who saw it, and who passed it on?",
        note: "A map, a post, or a family story can be a good link. It can also be a copy of a copy. Name the first link when you can. If you can't see one, you have a rumor, not a chain.",
      },
      caseId: "agloe",
      quote: {
        text: "So the single most personal fact you own, the day you began, is something you never witnessed. You were handed it.",
        chapter: 2,
        chapterTitle: "The Day You Were Born",
        file: "ch02.md",
        lines: "21–23",
      },
      ctaChapter: 3,
      ctaChapterTitle: "The Map Is Not the Ground",
      shareLine: "You take what's handed over, and treat the handoff as the check.",
    },
    counter: {
      slug: "counter",
      name: "The Counter",
      oneLine: "You mistake views, shares, and repeated outlets for witnesses.",
      read:
        "A claim that has been seen a million times can still rest on one source. Reach feels like confirmation, because a crowd is noisy and a single witness is quiet. Count the people who were actually there, not the people who passed the file along.",
      skips: {
        name: "Witnesses",
        ask: "Independent, or one source copied?",
        note: "Independent witnesses who never compared notes, and still agree, are worth a lot. Four outlets that copied one unsourced line are still one source.",
      },
      caseId: "jarre",
      quote: {
        text: "Then what about millions of people who watched the same video? Still one witness. Seen millions of times.",
        chapter: 6,
        chapterTitle: "Millions of Copies",
        file: "ch06.md",
        lines: "104–106",
      },
      ctaChapter: 6,
      ctaChapterTitle: "Millions of Copies",
      shareLine: "You mistake views, shares, and repeated outlets for witnesses.",
    },
    cynic: {
      slug: "cynic",
      name: "The Cynic",
      oneLine: "You treat “trust nothing” as a defense, and get fooled by different people.",
      read:
        "Doubting everything feels careful. It isn't safer. You still have to act, so you still believe things — often the ones that flatter the doubt. The work is to grade a claim, and to let a strong grade stand.",
      skips: {
        name: "Fit",
        ask: "Does it hold up against what's already well established?",
        note: "Fit is not an order to trust officials because they are officials. It is a check: does this hold up against what is already well established, including other traces of the same event? Throwing the established record out leaves you with nothing to weigh.",
      },
      caseId: "pentagon",
      quote: {
        text: "Trust nothing, and you're still fooled. Just by different people.",
        chapter: 11,
        chapterTitle: "Provisional, Not Cynical",
        file: "ch11.md",
        line: "23",
      },
      ctaChapter: 11,
      ctaChapterTitle: "Provisional, Not Cynical",
      shareLine: "You treat “trust nothing” as a defense, and get fooled by different people.",
    },
    grader: {
      slug: "grader",
      name: "The Grader",
      oneLine: "You weigh what you're handed, and you let a strong grade stand.",
      read:
        "You don't have to swallow the first account, and you don't have to trust nothing. You sort the door, run the four questions, and then you weigh it. When the chain is strong, the witnesses independent, the original intact, and the fit clean, you say so.",
      skips: {
        name: "Original",
        ask: "Is there a trace to check it against?",
        note: "You already run the four. The one to keep sharp is Original: is there a trace to check it against? A surviving print, a recording with a known source, a person you can still ask. That is how an edit gets caught — and how a real record gets to stand.",
      },
      caseId: "lenin",
      quote: {
        text: "Then weigh it. Build on it. Lean on it lightly. Mention it, labeled. Or set it aside until more comes in.",
        chapter: "Grade Card",
        chapterTitle: "The Grade Card (back matter)",
        file: "extras.md",
        line: "29",
      },
      ctaChapter: 10,
      ctaChapterTitle: "Grading the Borrowed",
      shareLine: "You weigh what you're handed, and you let a strong grade stand.",
    },
  };

  var CASES = [
    {
      id: "agloe",
      title: "The town on the map",
      chapter: 3,
      chapterTitle: "The Map Is Not the Ground",
      summary:
        "Agloe was a fake Catskills hamlet two mapmakers invented as a copy trap. It later turned up on other maps, on a business, and for a time in a government place-names database.",
      grade: "Fails.",
      verdict: "One source, copied, is still one source.",
      verdictSource: {
        chapter: "Five Worked Cases (back matter)",
        file: "extras.md",
        line: "76",
      },
      detail:
        "After the first link, nobody needed to lie. Each link only had to copy what the link before it said.",
    },
    {
      id: "cottingley",
      title: "The fairies in the garden",
      chapter: 4,
      chapterTitle: "Seeing Was Believing",
      summary:
        "In 1917, two cousins took photographs of fairies by a stream in Cottingley. A famous author published them.",
      grade: "Fails.",
      verdict: "A famous name carried it, not evidence.",
      verdictSource: {
        chapter: "Five Worked Cases (back matter)",
        file: "extras.md",
        line: "82",
      },
      detail:
        "In 1983 the cousins explained: drawings on card, held up with hatpins. A print only shows what was in front of the lens.",
    },
    {
      id: "jarre",
      title: "The final waltz",
      chapter: 6,
      chapterTitle: "Millions of Copies",
      summary:
        "After Maurice Jarre died in 2009, a Dublin student added an invented quote to his Wikipedia page. It ran in obituaries in respected outlets, in more than one country.",
      grade: "Fails.",
      verdict: "Four outlets, one source copied.",
      verdictSource: {
        chapter: "Five Worked Cases (back matter)",
        file: "extras.md",
        line: "88",
      },
      detail:
        "One student wrote it. One witness, seen again. It came out only because the student emailed the papers and told them.",
    },
    {
      id: "lenin",
      title: "The men who vanished",
      chapter: 8,
      chapterTitle: "The Man Who Vanished",
      summary:
        "A 1920 photograph of Lenin speaking to troops showed Trotsky and Kamenev on the steps. In later official versions, they were cut out.",
      grade: "The edit fails. It was caught because the original survived.",
      verdict: "The edit got caught because an uncut print survived.",
      verdictSource: {
        chapter: "The Grade Card (back matter)",
        file: "extras.md",
        line: "23",
      },
      detail:
        "Look at the two prints together and the edit is obvious.",
    },
    {
      id: "pentagon",
      title: "The smoke by the Pentagon",
      chapter: 10,
      chapterTitle: "Grading the Borrowed",
      summary:
        "On May 22, 2023, an image of smoke near the Pentagon spread widely. Some accounts sharing it carried checkmarks. There was one picture.",
      grade: "Fails.",
      verdict:
        "The fire department and the Pentagon's own protection agency said there was no explosion.",
      verdictSource: {
        chapter: "The Grade Card (back matter)",
        file: "extras.md",
        line: "27",
      },
      waters:
        "There's also no other images, videos or people posting as first hand witnesses.",
      watersSource: {
        attribution: "Nick Waters, Bellingcat, quoted in Chapter 10",
        file: "ch10.md",
        line: "203",
      },
      detail:
        "A real explosion there, on a weekday morning, would have people filming from every direction.",
    },
  ];

  var PHONE_CASE = {
    title: "The voice on the phone",
    label: "This one is a scenario, not a news story.",
    summary:
      "Your phone rings. It's your grandmother's voice. She's scared, and she needs money sent right now.",
    grade: "Unknown until you hang up and call her back.",
    verdict: "A voice is a claim now, not a witness.",
    verdictSource: {
      chapter: "Five Worked Cases (back matter)",
      file: "extras.md",
      line: "100",
    },
    detail:
      "Hang up, and call back on a number you already know. Don't let <em>it looks real</em> close the case.",
  };

  var QUESTIONS = [
    {
      id: 1,
      prompt:
        "A dramatic clip hits your feed. It has been shared 40,000 times. You have not seen another angle, and you were not there. What do you do?",
      answers: [
        {
          id: "a",
          type: "borrower",
          text: "I pass it on. It was handed to me already moving, so I hand it on too.",
        },
        {
          id: "b",
          type: "grader",
          text: "I ask who took it, whether anyone else filmed it, and whether it fits what else is known.",
        },
        {
          id: "c",
          type: "counter",
          text: "Forty thousand shares means a lot of people saw it. That many eyes are a kind of proof.",
        },
        {
          id: "d",
          type: "cynic",
          text: "I assume it's fake. On this app, they all are.",
        },
      ],
    },
    {
      id: 2,
      prompt:
        "A place you've never been appears on two different maps and in a government place-names list. How do you treat that?",
      answers: [
        {
          id: "a",
          type: "counter",
          text: "That's three listings. Three sources. It's there.",
        },
        {
          id: "b",
          type: "cynic",
          text: "Official maps and government lists are the last things I would trust.",
        },
        {
          id: "c",
          type: "borrower",
          text: "If it's on the maps and in the official list, I take it as a place.",
        },
        {
          id: "d",
          type: "grader",
          text: "I'd want to know who put it there first, and whether each list only copied the last.",
        },
      ],
    },
    {
      id: 3,
      prompt:
        "A photograph of something hard to believe is published by a famous author. The picture itself looks clear. What's your move?",
      answers: [
        {
          id: "a",
          type: "grader",
          text: "A photograph shows what was in front of the lens. I'd still ask who was there, and whether anything else fits what it shows.",
        },
        {
          id: "b",
          type: "borrower",
          text: "If someone that well known stood behind it, I'll take it.",
        },
        {
          id: "c",
          type: "cynic",
          text: "Famous names are used to sell stories. I don't buy the picture or the author.",
        },
        {
          id: "d",
          type: "counter",
          text: "It's a photograph. The camera was there, and now everyone who sees it has seen it too.",
        },
      ],
    },
    {
      id: 4,
      prompt:
        "The same striking quote appears in four respected outlets, in more than one country. You have not seen an original source. What do you conclude?",
      answers: [
        {
          id: "a",
          type: "cynic",
          text: "If the papers all have it, they're repeating each other. I treat the quote as something they wanted to be true.",
        },
        {
          id: "b",
          type: "counter",
          text: "Four outlets, in more than one country. That's a lot of confirmation.",
        },
        {
          id: "c",
          type: "grader",
          text: "I'd try to trace all four back. If they lead to one unsourced page, that's still one source.",
        },
        {
          id: "d",
          type: "borrower",
          text: "I'll use the quote. Serious papers already ran it, so the checking was done.",
        },
      ],
    },
    {
      id: 5,
      prompt:
        "An old official photograph of a public event is in the books. Someone says people were later removed from the print. How do you weigh that?",
      answers: [
        {
          id: "a",
          type: "borrower",
          text: "I go with the official version. It's the one that was printed and taught.",
        },
        {
          id: "b",
          type: "grader",
          text: "I'd look for an earlier print or negative to check it against. If one survived, the edit is visible.",
        },
        {
          id: "c",
          type: "counter",
          text: "The official print was reproduced everywhere. That many copies are the record.",
        },
        {
          id: "d",
          type: "cynic",
          text: "Of course they doctored it. They doctor everything. I wouldn't trust a surviving “original” either.",
        },
      ],
    },
    {
      id: 6,
      prompt:
        "By mid-morning, a picture of smoke beside a well-known public building is everywhere. Some accounts have checkmarks. Officials say nothing happened. What do you do?",
      answers: [
        {
          id: "a",
          type: "counter",
          text: "It's everywhere. If nothing had happened, there would not be this many posts.",
        },
        {
          id: "b",
          type: "borrower",
          text: "I go with whatever is already filling the feed. That's the account of the morning.",
        },
        {
          id: "c",
          type: "cynic",
          text: "They denied it, so something happened. That's what official denials are for.",
        },
        {
          id: "d",
          type: "grader",
          text: "A real event there would leave many different videos, from many angles. One picture is a weak claim, not proof of a cover-up.",
        },
      ],
    },
    {
      id: 7,
      prompt:
        "A company argues that a famous person's recorded public interviews might be deepfakes, because famous people are targets. It does not say these files were altered. How do you grade that argument?",
      answers: [
        {
          id: "a",
          type: "grader",
          text: "Public interviews with a known origin can be put to the person who was there. “It might be AI” is not a grade.",
        },
        {
          id: "b",
          type: "cynic",
          text: "If it might be a deepfake, I treat it as one. Recorded video isn't proof of anything anymore.",
        },
        {
          id: "c",
          type: "borrower",
          text: "I'll take the company's word. They raised the doubt, so the recordings are in question.",
        },
        {
          id: "d",
          type: "counter",
          text: "The warning about deepfakes has been repeated everywhere. That much repetition means I have to treat these as unsafe too.",
        },
      ],
    },
    {
      id: 8,
      prompt:
        "Your phone rings. It is a voice you know well, scared, asking you to send money right now. What do you do?",
      answers: [
        {
          id: "a",
          type: "borrower",
          text: "It sounds like them. I help first and sort out the details after.",
        },
        {
          id: "b",
          type: "counter",
          text: "I search while we're talking. If a lot of people describe the same kind of call, I let that volume decide whether this one is real.",
        },
        {
          id: "c",
          type: "grader",
          text: "I hang up and call back on a number I already know. A voice is a claim now, not a witness.",
        },
        {
          id: "d",
          type: "cynic",
          text: "I don't trust the call, and I don't trust a callback either. Anyone can be got at.",
        },
      ],
    },
    {
      id: 9,
      prompt:
        "A family story about your own early life has been told at the table for years. You don't remember the day. How do you hold it?",
      answers: [
        {
          id: "a",
          type: "cynic",
          text: "Family stories are just stories. I don't treat any of them as true.",
        },
        {
          id: "b",
          type: "grader",
          text: "The people who were there can be strong witnesses. I'd still separate the day from the telling, and I wouldn't throw the whole thing out.",
        },
        {
          id: "c",
          type: "borrower",
          text: "If the family always told it that way, that's what happened.",
        },
        {
          id: "d",
          type: "counter",
          text: "Everyone in the family tells it. That many tellings are a lot of witnesses.",
        },
      ],
    },
    {
      id: 10,
      prompt:
        "A friend forwards a video and writes, “Millions of views. This is huge.” What does that number tell you?",
      answers: [
        {
          id: "a",
          type: "counter",
          text: "Millions of views means millions of people saw it for themselves.",
        },
        {
          id: "b",
          type: "cynic",
          text: "A number that big is a tell. Something this widely pushed is trying to fool you.",
        },
        {
          id: "c",
          type: "borrower",
          text: "I take my friend's word and watch it as news. They wouldn't send it if it weren't solid.",
        },
        {
          id: "d",
          type: "grader",
          text: "Millions of views can still be one witness, seen millions of times. I'd ask who was actually there.",
        },
      ],
    },
    {
      id: 11,
      prompt:
        "A claim is about a place you will never visit, and you will never check it yourself. What then?",
      answers: [
        {
          id: "a",
          type: "grader",
          text: "Most of what anyone knows is borrowed. I'd grade the chain I have, hold it provisionally, and not pretend that refusing it is safer.",
        },
        {
          id: "b",
          type: "borrower",
          text: "I'll believe the first clear explanation I get. I have no way to do better.",
        },
        {
          id: "c",
          type: "cynic",
          text: "If I can't check it myself, I refuse to believe it. Trust nothing you can't see with your own eyes.",
        },
        {
          id: "d",
          type: "counter",
          text: "I'll wait until I see it everywhere. Once the whole feed has it, it's solid enough.",
        },
      ],
    },
    {
      id: 12,
      prompt:
        "You're about to share something that feels true, and it feels urgent. What happens in the pause?",
      answers: [
        {
          id: "a",
          type: "borrower",
          text: "If it feels true, I share it. The feeling is a kind of knowing.",
        },
        {
          id: "b",
          type: "counter",
          text: "If it's already moving, adding my share helps it travel. The crowd is already doing the work.",
        },
        {
          id: "c",
          type: "cynic",
          text: "I don't share anything, and I don't bother checking. Checking is just picking a side.",
        },
        {
          id: "d",
          type: "grader",
          text: "I run the four questions first: chain, witnesses, original, fit. Then I decide whether to build on it, lean on it lightly, mention it labeled, or set it aside.",
        },
      ],
    },
  ];

  var WITNESS_LINES = [
    {
      text: "A witness is somebody who was there. Who saw it with their own eyes, from their own spot, and can tell you what they saw.",
      chapter: 6,
      file: "ch06.md",
      line: "94",
    },
    {
      text: "Two witnesses who never talked to each other, both saying the same thing, are worth a lot. They're independent. If they agree, it's because the thing itself made them agree.",
      chapter: 6,
      file: "ch06.md",
      line: "96",
    },
    {
      text: "Then what about millions of people who watched the same video? Still one witness. Seen millions of times.",
      chapter: 6,
      file: "ch06.md",
      lines: "104–106",
    },
    {
      text: "Count witnesses, not views.",
      chapter: "The Clean Link Checklist (back matter)",
      file: "extras.md",
      line: "55",
    },
  ];

  var PATHS_LINES = {
    three: "That's it. Three.",
    noFourth: "Three paths. No fourth.",
    chapter: 1,
    file: "ch01.md",
    lines: "198–202",
  };

  root.SOURCE_TEST = {
    BOOK_URL: BOOK_URL,
    bookUrl: bookUrl,
    FILTER: FILTER,
    GRADE_CARD: GRADE_CARD,
    TYPES: TYPES,
    TYPE_ORDER: ["borrower", "counter", "cynic", "grader"],
    CASES: CASES,
    PHONE_CASE: PHONE_CASE,
    QUESTIONS: QUESTIONS,
    WITNESS_LINES: WITNESS_LINES,
    PATHS_LINES: PATHS_LINES,
  };
})(window);
