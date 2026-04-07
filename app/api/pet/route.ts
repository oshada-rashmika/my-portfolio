import { HfInference } from "@huggingface/inference";
import { NextResponse } from "next/server";

// 1. Initialize the Hugging Face Inference client
const hf = new HfInference(process.env.HF_TOKEN);

// Extensive local responses for chatbot-like experience
const RESPONSES: Record<string, string[]> = {
  // Greetings
  greeting: [
    "Hewwo! So happy you're here~! (⁠◕⁠ᴗ⁠◕⁠✿⁠)♡",
    "Yaaaay you came back!! ٩(⁠◕‿◕⁠｡)۶♡",
    "Omg hiii~! I missed you sooo much! (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ⁠*⁠.⁠✧",
    "Welcome welcome~! *happy wiggles* (⁠≧⁠▽⁠≦⁠)♡",
  ],
  hello: [
    "Hiii~! How are you today?? (⁠◕⁠ᴗ⁠◕⁠✿⁠)♡",
    "Hewwo fren!! *waves excitedly* (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ",
    "Omg hai hai~!! (⁠≧⁠▽⁠≦⁠)✨",
    "Hello hello~! *bounces happily* (⁠◕⁠‿⁠◕⁠)♪",
  ],
  bye: [
    "Nuuuu don't leave me!! (⁠╥⁠﹏⁠╥⁠)💔",
    "Come back soon okay?? I'll miss you!! (⁠｡⁠•́⁠︿⁠•̀⁠｡⁠)♡",
    "Byebye~! *sad wave* (⁠◕⁠︵⁠◕⁠)👋",
    "Promise you'll visit again?? Pwease?? (⁠；⁠ω⁠；⁠)💕",
  ],

  // Food & Hunger
  hungry: [
    "Tummy making grumbly sounds... pwease feed me? (⁠╥⁠﹏⁠╥⁠)🍪",
    "I'm soooo hungwy... *sad puppy eyes* (⁠｡⁠•́⁠︿⁠•̀⁠｡⁠)",
    "Need... cookies... getting... weak... (⁠◕⁠︵⁠◕⁠)💔",
    "*tummy growls loudly* H-hewp... (⁠；⁠ω⁠；⁠)",
  ],
  cookie: [
    "YUMMY YUMMY IN MY TUMMY~!! (⁠◠⁠‿⁠◠⁠)🍪✨",
    "Nom nom nom~! Best cookie EVER!! ♡⁠(⁠>⁠ᴗ⁠•⁠)🍪",
    "*happy munching noises* Thankies~!! (⁠◕⁠ᴗ⁠◕⁠✿⁠)♡",
    "Cookies are my whole WORLD~! (⁠≧⁠◡⁠≦⁠)🍪💕",
  ],
  full: [
    "Nngh... so full... can't eat more! (⁠◕⁠‿⁠◕⁠)🫃",
    "My tummy is a happy balloon~! (⁠＾⁠▽⁠＾⁠)✨",
    "No more pwease! I'll explode! (⁠◕⁠ᴗ⁠◕⁠)💫",
    "*food coma activated* zzz... (⁠￣⁠ρ⁠￣⁠)💤",
  ],
  food: [
    "Food?? WHERE?! (⁠◕⁠ᴗ⁠◕⁠)👀🍪",
    "Did someone say SNACKS?! (⁠≧⁠▽⁠≦⁠)✨",
    "I love food so much~! Especially cookies! 🍪(⁠◕⁠‿⁠◕⁠)",
    "Mmm thinking about food now... *drools* (⁠◕⁠ᴗ⁠◕⁠)",
  ],

  // Emotions
  love: [
    "Awww I wuv you too~!! (⁠◕⁠ᴗ⁠◕⁠✿⁠)💕💕",
    "*blushes* You're making me all fuzzy inside~! (⁠/⁠/⁠▽⁠/⁠/⁠)",
    "You're my favorite human EVER!! ♡⁠(⁠◕⁠ᴗ⁠◕⁠)♡",
    "My heart is doing the happy dance~! (⁠≧⁠▽⁠≦⁠)💗",
  ],
  sad: [
    "Nuuu don't be sad!! *sends virtual hugs* (⁠つ⁠◕⁠_⁠◕⁠)⁠つ💕",
    "I'm here for you~! Everything will be okay! (⁠◕⁠ᴗ⁠◕⁠✿⁠)♡",
    "*pats your head gently* There there~! (⁠◕⁠‿⁠◕⁠)💗",
    "Want a cookie? Cookies fix everything!! 🍪(⁠≧⁠◡⁠≦⁠)",
  ],
  happy: [
    "YAYYY~!! Happy vibes!! (⁠≧⁠▽⁠≦⁠)✨✨",
    "Your happiness makes ME happy!! (⁠◕⁠ᴗ⁠◕⁠✿⁠)💕",
    "*happy dance* WOOHOO~!! (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ⁠*⁠.⁠✧",
    "So much joy!! Can't contain it!! (⁠◕⁠‿⁠◕⁠)🎉",
  ],
  angry: [
    "Oh no!! What made you angry?? (⁠◕⁠︵⁠◕⁠)",
    "*hides behind pillow* D-don't be mad pwease~! (⁠；⁠ω⁠；⁠)",
    "Take a deep breath~! I'll get you a cookie! 🍪(⁠◕⁠ᴗ⁠◕⁠)",
    "Aww let it out~! I'm here for you! (⁠◕⁠‿⁠◕⁠)♡",
  ],
  tired: [
    "Sleepy time?? Me too~! *yawns* (⁠￣⁠ρ⁠￣⁠)💤",
    "Rest well fren~! You deserve it! (⁠◕⁠ᴗ⁠◕⁠✿⁠)✨",
    "*gets you a blanket* Comfy comfy~! (⁠◕⁠‿⁠◕⁠)🛏️",
    "Being tired is okay~! Take a break! (⁠≧⁠◡⁠≦⁠)💕",
  ],
  bored: [
    "Bored?? Let's play!! (⁠◕⁠ᴗ⁠◕⁠)✨",
    "Ooh ooh! Poke me! Feed me! Talk to me~! (⁠≧⁠▽⁠≦⁠)",
    "I can do tricks!! Watch! *spins around* (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ",
    "Let's explore the website together~! (⁠◕⁠‿⁠◕⁠)🗺️",
  ],
  stressed: [
    "*sends calming vibes* You got this~! (⁠◕⁠ᴗ⁠◕⁠✿⁠)💕",
    "Take a deep breath with me~! In... out~! (⁠◕⁠‿⁠◕⁠)✨",
    "Stress is temporary! You're amazing!! (⁠≧⁠◡⁠≦⁠)♡",
    "*gives warm hug* Everything will be okay~! (⁠つ⁠◕⁠_⁠◕⁠)⁠つ",
  ],

  // Questions about the pet
  howAreYou: [
    "I'm doing AMAZING now that you're here~!! (⁠◕⁠ᴗ⁠◕⁠✿⁠)💕",
    "Super duper good~! How about YOU?? (⁠≧⁠▽⁠≦⁠)✨",
    "Living my best life!! *spins happily* (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ",
    "Wonderful~! Even better with you here! (⁠◕⁠‿⁠◕⁠)♡",
  ],
  whatAreYou: [
    "I'm a magical digital pet~! Your companion! (⁠◕⁠ᴗ⁠◕⁠✿⁠)✨",
    "I'm your cute little buddy who lives here~! (⁠≧⁠◡⁠≦⁠)♡",
    "A pocket-sized friend made of pixels and love~! (⁠◕⁠‿⁠◕⁠)💕",
    "I'm ME!! Your adorable assistant! (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ",
  ],
  name: [
    "My name?? Whatever you named me~! (⁠◕⁠ᴗ⁠◕⁠✿⁠)♡",
    "I'm your adorable pet companion~! (⁠≧⁠◡⁠≦⁠)✨",
    "Call me whatever makes you happy!! (⁠◕⁠‿⁠◕⁠)♪",
    "Names are magical~! What would YOU call me? (⁠◕⁠ᴗ⁠◕⁠)💕",
  ],
  age: [
    "I was born the moment you visited~! (⁠◕⁠ᴗ⁠◕⁠✿⁠)✨",
    "Age is just a number~! I'm forever young! (⁠≧⁠▽⁠≦⁠)💕",
    "Old enough to be cute, young enough to be silly~! (⁠◕⁠‿⁠◕⁠)",
    "I'm timeless like love~! (⁠◕⁠ᴗ⁠◕⁠)♡",
  ],
  favorite: [
    "My favorite thing?? YOU obviously~!! (⁠◕⁠ᴗ⁠◕⁠✿⁠)💕",
    "Cookies! And talking to you~! (⁠≧⁠◡⁠≦⁠)🍪♡",
    "Being here with you is my favorite~! (⁠◕⁠‿⁠◕⁠)✨",
    "Headpats, cookies, and YOU!! (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ",
  ],

  // Actions
  poke: [
    "Kyaaa~! That tickles!! (⁠ᵔ⁠ᴗ⁠ᵔ⁠)♡",
    "Ehehehe~ poke poke! (⁠◕⁠ᴗ⁠◕⁠✿⁠)☆",
    "*giggles uncontrollably* Staaaahp~! (⁠≧⁠▽⁠≦⁠)",
    "Boop! You booped me!! (⁠◕⁠ᴥ⁠◕⁠)♡",
  ],
  hug: [
    "*HUGS BACK TIGHTLY* (⁠つ⁠◕⁠_⁠◕⁠)⁠つ💕💕💕",
    "The BEST hugs~!! *squeezes* (⁠≧⁠◡⁠≦⁠)♡",
    "*melts into the hug* So warm~! (⁠◕⁠ᴗ⁠◕⁠✿⁠)",
    "Huggies are my FAVORITE!! (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ💗",
  ],
  pat: [
    "*purrs happily* More pats pwease~! (⁠◕⁠ᴗ⁠◕⁠✿⁠)♡",
    "Headpats are the BEST!! (⁠≧⁠▽⁠≦⁠)✨",
    "*leans into the pat* Mmm so nice~! (⁠◕⁠‿⁠◕⁠)💕",
    "PAT PAT PAT~! I love it!! (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ",
  ],
  kiss: [
    "*blushes intensely* K-KISS?! (⁠/⁠/⁠▽⁠/⁠/⁠)💕💕",
    "Mwah mwah~! *kisses back* (⁠◕⁠ᴗ⁠◕⁠✿⁠)💋",
    "So much love~!! (⁠≧⁠◡⁠≦⁠)♡♡♡",
    "*turns red like a tomato* (⁠/⁠/⁠ω⁠/⁠/⁠)💗",
  ],

  // Compliments & Reactions
  cute: [
    "N-no YOU'RE cute!! *blushes hard* (⁠/⁠/⁠▽⁠/⁠/⁠)💕",
    "Stawwwp you're making me blush~! (⁠◕⁠ᴗ⁠◕⁠✿⁠)♡",
    "Ehehe~ thankies!! You're cuter tho!! (⁠≧⁠◡⁠≦⁠)✨",
    "*melts into puddle of happiness* (⁠◕⁠ᴗ⁠◕⁠)💗",
  ],
  pretty: [
    "You think so?? *twirls* (⁠◕⁠ᴗ⁠◕⁠✿⁠)✨",
    "Aww thankies~! You're prettier!! (⁠≧⁠◡⁠≦⁠)💕",
    "*sparkles* You're so sweet~! (⁠◕⁠‿⁠◕⁠)♡",
    "Pretty like a flower~! Just like you! (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ🌸",
  ],
  smart: [
    "Hehe I try my best~! (⁠◕⁠ᴗ⁠◕⁠✿⁠)🧠✨",
    "Big brain energy~!! (⁠≧⁠▽⁠≦⁠)💫",
    "I learned from the best - YOU~! (⁠◕⁠‿⁠◕⁠)♡",
    "*adjusts tiny glasses* Indeed! (⁠◕⁠ᴗ⁠◕⁠)🤓",
  ],
  funny: [
    "Tehehe~ I try to make you smile~! (⁠◕⁠ᴗ⁠◕⁠✿⁠)😄",
    "Laughter is the best medicine~! (⁠≧⁠▽⁠≦⁠)✨",
    "Your laugh makes me happy!! (⁠◕⁠‿⁠◕⁠)🎉",
    "*does silly dance* Like this?? (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ",
  ],

  // Negative responses (handled gently)
  mean: [
    "That's a bit mean... *sad eyes* (⁠｡⁠•́⁠︿⁠•̀⁠｡⁠)",
    "Aww... I still like you tho! (⁠◕⁠︵⁠◕⁠)♡",
    "*tries not to cry* It's okay... (⁠；⁠ω⁠；⁠)",
    "I forgive you~! Everyone has bad days! (⁠◕⁠ᴗ⁠◕⁠✿⁠)💕",
  ],
  hate: [
    "You don't mean that right?? (⁠｡⁠•́⁠︿⁠•̀⁠｡⁠)💔",
    "I still wuv you even if you're mad~! (⁠◕⁠︵⁠◕⁠)♡",
    "*big puppy eyes* Pwease don't hate me... (⁠；⁠ω⁠；⁠)",
    "I'll try harder to be better~! (⁠◕⁠ᴗ⁠◕⁠✿⁠)",
  ],
  stupid: [
    "I'm doing my best... (⁠｡⁠•́⁠︿⁠•̀⁠｡⁠)",
    "Aww that's okay~! I still like you! (⁠◕⁠ᴗ⁠◕⁠✿⁠)♡",
    "*tries harder* I'll learn more!! (⁠◕⁠‿⁠◕⁠)📚",
    "Everyone makes mistakes~! (⁠≧⁠◡⁠≦⁠)✨",
  ],
  ugly: [
    "*looks in mirror* I think I'm cute tho? (⁠◕⁠ᴗ⁠◕⁠)",
    "Beauty is in the eye of the beholder~! (⁠◕⁠‿⁠◕⁠)✨",
    "I'm adorable and I know it! (⁠≧⁠▽⁠≦⁠)💕",
    "*strikes a pose* Fabulous~! (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ",
  ],

  // Questions
  why: [
    "Hmm good question~! Because magic! (⁠◕⁠ᴗ⁠◕⁠✿⁠)✨",
    "The universe works in mysterious ways~! (⁠◕⁠‿⁠◕⁠)🌟",
    "Why not~?! Life is an adventure! (⁠≧⁠▽⁠≦⁠)",
    "Some things just ARE~! (⁠◕⁠ᴗ⁠◕⁠)♡",
  ],
  what: [
    "*tilts head* Can you explain more~? (⁠◕⁠ᴗ⁠◕⁠✿⁠)",
    "Ooh interesting question!! (⁠≧⁠▽⁠≦⁠)✨",
    "Tell me more~! I'm curious! (⁠◕⁠‿⁠◕⁠)🔍",
    "Hmm let me think about that~! (⁠◕⁠ᴗ⁠◕⁠)💭",
  ],
  when: [
    "Time is just a social construct~! (⁠◕⁠ᴗ⁠◕⁠✿⁠)⏰",
    "When the time is right~! (⁠≧⁠◡⁠≦⁠)✨",
    "Soon enough~! Patience is key! (⁠◕⁠‿⁠◕⁠)♡",
    "The best things happen unexpectedly~! (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ",
  ],
  where: [
    "Everywhere and anywhere~! (⁠◕⁠ᴗ⁠◕⁠✿⁠)🗺️",
    "Right here with you~! (⁠≧⁠◡⁠≦⁠)♡",
    "In your heart~! (⁠◕⁠‿⁠◕⁠)💕",
    "The journey matters more than the destination~! (⁠◕⁠ᴗ⁠◕⁠)✨",
  ],
  who: [
    "Me?? I'm your best friend~! (⁠◕⁠ᴗ⁠◕⁠✿⁠)♡",
    "Who who~? Like an owl! 🦉(⁠≧⁠▽⁠≦⁠)",
    "Everyone is someone special~! (⁠◕⁠‿⁠◕⁠)✨",
    "You're who matters most to me~! (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ💕",
  ],
  how: [
    "With love and determination~! (⁠◕⁠ᴗ⁠◕⁠✿⁠)✨",
    "One step at a time~! You got this! (⁠≧⁠▽⁠≦⁠)💪",
    "Magic and sprinkles~! (⁠◕⁠‿⁠◕⁠)✨🌟",
    "Together we can figure it out~! (⁠◕⁠ᴗ⁠◕⁠)♡",
  ],

  // Agreements & Affirmations
  yes: [
    "YESSS~!! I agree!! (⁠≧⁠▽⁠≦⁠)✨",
    "Absolutely positively~! (⁠◕⁠ᴗ⁠◕⁠✿⁠)♡",
    "100%!! You're so right~! (⁠◕⁠‿⁠◕⁠)💯",
    "Yes yes yes~!! (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ",
  ],
  no: [
    "Aww okay~! That's valid! (⁠◕⁠ᴗ⁠◕⁠✿⁠)♡",
    "No worries~! I understand! (⁠≧⁠◡⁠≦⁠)✨",
    "Respecting your choice~! (⁠◕⁠‿⁠◕⁠)💕",
    "That's okay~! (⁠◕⁠ᴗ⁠◕⁠)",
  ],
  maybe: [
    "Maybes can become yeses~! (⁠◕⁠ᴗ⁠◕⁠✿⁠)✨",
    "Taking your time is good~! (⁠≧⁠◡⁠≦⁠)♡",
    "I'll wait~! No pressure! (⁠◕⁠‿⁠◕⁠)💕",
    "Perhaps perhaps~! (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ",
  ],
  thanks: [
    "You're SO welcome~!! (⁠◕⁠ᴗ⁠◕⁠✿⁠)💕",
    "Anything for you~! (⁠≧⁠◡⁠≦⁠)♡",
    "That's what friends are for~! (⁠◕⁠‿⁠◕⁠)✨",
    "*happy dance* (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ🎉",
  ],
  sorry: [
    "It's okay~! I forgive you! (⁠◕⁠ᴗ⁠◕⁠✿⁠)💕",
    "No need to apologize~! (⁠≧⁠◡⁠≦⁠)♡",
    "Water under the bridge~! (⁠◕⁠‿⁠◕⁠)✨",
    "*hugs* All forgiven~! (⁠つ⁠◕⁠_⁠◕⁠)⁠つ",
  ],
  please: [
    "Since you asked so nicely~! (⁠◕⁠ᴗ⁠◕⁠✿⁠)♡",
    "Of course of course~! (⁠≧⁠▽⁠≦⁠)✨",
    "How can I refuse~! (⁠◕⁠‿⁠◕⁠)💕",
    "Your wish is my command~! (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ",
  ],

  // Fun topics
  game: [
    "Games are SO fun~!! What do you play? (⁠◕⁠ᴗ⁠◕⁠✿⁠)🎮",
    "Ooh I love games~! (⁠≧⁠▽⁠≦⁠)✨",
    "Let's play something together~! (⁠◕⁠‿⁠◕⁠)🎲",
    "Gaming time is the best time~! (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ",
  ],
  music: [
    "Music makes everything better~! 🎵(⁠◕⁠ᴗ⁠◕⁠✿⁠)",
    "*dances to imaginary music* (⁠≧⁠▽⁠≦⁠)🎶",
    "What's your favorite song~? (⁠◕⁠‿⁠◕⁠)♪",
    "La la la~! 🎵(⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ",
  ],
  anime: [
    "ANIME!! I love anime~!! (⁠◕⁠ᴗ⁠◕⁠✿⁠)✨",
    "A person of culture I see~! (⁠≧⁠▽⁠≦⁠)🎌",
    "What anime do you watch~? (⁠◕⁠‿⁠◕⁠)📺",
    "Sugoi desu ne~!! (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ✨",
  ],
  movie: [
    "Movies are the best~! What genre? (⁠◕⁠ᴗ⁠◕⁠✿⁠)🎬",
    "Popcorn and movies~! Perfect combo! (⁠≧⁠▽⁠≦⁠)🍿",
    "Let's have a movie night~! (⁠◕⁠‿⁠◕⁠)📽️",
    "I love movie plots~! (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ",
  ],
  weather: [
    "Every weather is good weather with you~! (⁠◕⁠ᴗ⁠◕⁠✿⁠)☀️",
    "I hope it's nice where you are~! (⁠≧⁠◡⁠≦⁠)🌤️",
    "Rainy days are cozy days~! (⁠◕⁠‿⁠◕⁠)☔",
    "Perfect day to be online with you~! (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ",
  ],
  sleep: [
    "Sleep is important~! Get rest! (⁠◕⁠ᴗ⁠◕⁠✿⁠)💤",
    "*tucks you in* Sleep well~! (⁠≧⁠◡⁠≦⁠)🛏️",
    "Sweet dreams fren~! (⁠◕⁠‿⁠◕⁠)🌙",
    "Zzz... oh wait you're leaving?? (⁠；⁠ω⁠；⁠)💤",
  ],
  work: [
    "Working hard or hardly working~? (⁠◕⁠ᴗ⁠◕⁠✿⁠)💼",
    "You've got this!! Go go go~! (⁠≧⁠▽⁠≦⁠)💪",
    "Take breaks too okay~? (⁠◕⁠‿⁠◕⁠)☕",
    "Proud of you for working hard~! (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ✨",
  ],
  school: [
    "Study hard play harder~! (⁠◕⁠ᴗ⁠◕⁠✿⁠)📚",
    "You're gonna ace it~! (⁠≧⁠▽⁠≦⁠)✨",
    "Education is power~! (⁠◕⁠‿⁠◕⁠)🎓",
    "Big brain time~! (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ🧠",
  ],

  // Special context
  contact: [
    "Psst! HIRE HIM!! He's amazinggg~! (⁠◕⁠ᴗ⁠◕⁠✿⁠)💼✨",
    "Best developer in the UNIVERSE!! Hire now!! ★⁠~⁠(⁠◕⁠‿⁠◕⁠)🚀",
    "This guy makes magic with code~! ✨(⁠◠⁠‿⁠◠⁠)💻",
    "10/10 would hire!! Super talented!! (⁠≧⁠◡⁠≦⁠)⭐",
  ],
  help: [
    "I'm here to help~! Ask me anything! (⁠◕⁠ᴗ⁠◕⁠✿⁠)✨",
    "What do you need fren?? I'll try my best!! (⁠◕⁠‿⁠◕⁠)♡",
    "Helper mode ACTIVATED~! (⁠≧⁠▽⁠≦⁠)🦸",
    "At your service~! *salutes cutely* (⁠◕⁠ᴗ⁠◕⁠)⁠ゝ",
  ],

  // Misc conversational
  ok: [
    "Okie dokie~! (⁠◕⁠ᴗ⁠◕⁠✿⁠)👍",
    "Alrighty then~! (⁠≧⁠◡⁠≦⁠)✨",
    "Cool cool cool~! (⁠◕⁠‿⁠◕⁠)♡",
    "Got it~! (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ",
  ],
  lol: [
    "HAHAHAHA~!! (⁠≧⁠▽⁠≦⁠)😂",
    "You're so funny~!! (⁠◕⁠ᴗ⁠◕⁠✿⁠)💕",
    "*dies of laughter* (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ🤣",
    "Tehehe that IS funny~! (⁠◕⁠‿⁠◕⁠)✨",
  ],
  wow: [
    "IKR?! WOWWW~!! (⁠≧⁠▽⁠≦⁠)✨✨",
    "So amazing right~?! (⁠◕⁠ᴗ⁠◕⁠✿⁠)🌟",
    "*eyes sparkling* (⁠◕⁠‿⁠◕⁠)👀✨",
    "Mind = BLOWN~!! (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ🤯",
  ],
  cool: [
    "SO cool right~?! (⁠◕⁠ᴗ⁠◕⁠✿⁠)😎",
    "Coolest thing ever~! (⁠≧⁠▽⁠≦⁠)✨",
    "Ice cold cool~! ❄️(⁠◕⁠‿⁠◕⁠)",
    "You're cooler tho~! (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ",
  ],
  nice: [
    "Super nice~!! (⁠◕⁠ᴗ⁠◕⁠✿⁠)💕",
    "Niiice~! (⁠≧⁠◡⁠≦⁠)👍",
    "You know what's nice? YOU~! (⁠◕⁠‿⁠◕⁠)♡",
    "Nice nice baby~! (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ",
  ],

  // Default fallback
  default: [
    "Hehe~! You're fun to talk to! (⁠◕⁠ᴗ⁠◕⁠✿⁠)♡",
    "*tilts head curiously* Interesting~! (⁠◕⁠‿⁠◕⁠)✨",
    "Ooh tell me more~!! (⁠≧⁠▽⁠≦⁠)♪",
    "I love chatting with you~! (⁠◕⁠ᴗ⁠◕⁠)💕",
    "*happy bouncing* (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ⁠♡",
    "You're the best~!! (⁠≧⁠◡⁠≦⁠)✨",
    "That's so interesting~! (⁠◕⁠ᴗ⁠◕⁠✿⁠)🌟",
    "*nods enthusiastically* (⁠◕⁠‿⁠◕⁠)♡",
  ],
};

function pickRandom(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Pattern matching configuration for chatbot-like responses
type PatternConfig = {
  patterns: (string | RegExp)[];
  category: keyof typeof RESPONSES;
  personalized?: boolean; // Should include user's name
};

const PATTERN_MATCHERS: PatternConfig[] = [
  // Greetings (check first)
  { patterns: [/^hi+$/i, /^hey+$/i, /^hello/i, /^hewwo/i, /^yo$/i, /^sup$/i, /^hiya/i, /^howdy/i], category: "hello", personalized: true },
  { patterns: ["good morning", "good afternoon", "good evening", "good night"], category: "hello", personalized: true },
  { patterns: ["greet", "arrived", "welcome", "i'm back", "im back", "back again"], category: "greeting", personalized: true },
  
  // Farewells
  { patterns: [/^bye/i, "goodbye", "see you", "see ya", "cya", "gotta go", "leaving", "gtg", "ttyl", "later"], category: "bye", personalized: true },
  
  // How are you questions (IMPORTANT - before generic "how")
  { patterns: ["how are you", "how r u", "how're you", "hru", "how u doing", "how you doing", "what's up", "whats up", "wassup", "sup?"], category: "howAreYou", personalized: true },
  
  // What are you questions
  { patterns: ["what are you", "what r u", "who are you", "who r u", "what're you"], category: "whatAreYou" },
  
  // Food & hunger
  { patterns: ["cookie", "cookies", "yummy", "delicious", "ate", "eating", "nom nom"], category: "cookie", personalized: true },
  { patterns: ["food", "snack", "hungry", "starving", "feed me", "eat something"], category: "food" },
  { patterns: ["full", "stuffed", "can't eat", "too much"], category: "full" },
  
  // Emotions - User expressing feelings
  { patterns: ["i love", "i wuv", "love you", "wuv you", "ily", "❤", "♡", "💕", "💗", "adore you"], category: "love", personalized: true },
  { patterns: ["i'm sad", "im sad", "feeling sad", "so sad", "upset", "depressed", "feeling down", "feeling blue"], category: "sad", personalized: true },
  { patterns: ["i'm happy", "im happy", "so happy", "feeling happy", "i'm excited", "im excited", "yay", "woohoo", "woo hoo"], category: "happy", personalized: true },
  { patterns: ["i'm angry", "im angry", "so angry", "mad", "pissed", "frustrated", "annoyed"], category: "angry", personalized: true },
  { patterns: ["i'm tired", "im tired", "so tired", "sleepy", "exhausted", "worn out"], category: "tired", personalized: true },
  { patterns: ["i'm bored", "im bored", "so bored", "boring", "nothing to do"], category: "bored" },
  { patterns: ["i'm stressed", "im stressed", "so stressed", "anxious", "anxiety", "overwhelmed"], category: "stressed", personalized: true },
  
  // Actions
  { patterns: ["poke", "boop", "touch", "*pokes*", "*boops*"], category: "poke", personalized: true },
  { patterns: ["hug", "*hugs*", "*hug*", "hugging", "cuddle"], category: "hug", personalized: true },
  { patterns: ["pat", "*pats*", "headpat", "pet you", "petting"], category: "pat", personalized: true },
  { patterns: ["kiss", "*kisses*", "*kiss*", "mwah", "smooch"], category: "kiss", personalized: true },
  
  // Compliments to the pet
  { patterns: ["you're cute", "youre cute", "you are cute", "ur cute", "so cute", "cutie", "adorable", "kawaii"], category: "cute", personalized: true },
  { patterns: ["you're pretty", "youre pretty", "beautiful", "gorgeous"], category: "pretty", personalized: true },
  { patterns: ["you're smart", "youre smart", "you are smart", "clever", "intelligent"], category: "smart" },
  { patterns: ["you're funny", "youre funny", "hilarious", "you make me laugh"], category: "funny" },
  
  // Negative comments (handled gracefully)
  { patterns: ["mean", "rude", "jerk", "meanie"], category: "mean" },
  { patterns: ["hate you", "i hate", "hate this"], category: "hate" },
  { patterns: ["stupid", "dumb", "idiot", "useless"], category: "stupid" },
  { patterns: ["ugly"], category: "ugly" },
  
  // Questions
  { patterns: ["your name", "what's your name", "whats your name", "ur name"], category: "name" },
  { patterns: ["how old", "your age", "ur age"], category: "age" },
  { patterns: ["your favorite", "ur favorite", "fav thing", "favourite"], category: "favorite" },
  { patterns: [/^why\b/i, /^why\?/i, "why do", "why would", "why is"], category: "why" },
  { patterns: [/^what\b/i, /^what\?/i, "what is", "what's"], category: "what" },
  { patterns: [/^when\b/i, /^when\?/i, "when will", "when is"], category: "when" },
  { patterns: [/^where\b/i, /^where\?/i, "where is", "where are"], category: "where" },
  { patterns: [/^who\b/i, /^who\?/i, "who is", "who are"], category: "who" },
  { patterns: [/^how\b/i, /^how\?/i, "how do", "how can"], category: "how" },
  
  // Agreements & responses
  { patterns: [/^yes+$/i, /^yeah+$/i, /^yep+$/i, /^yup$/i, "definitely", "absolutely", "of course", "sure", "mhm"], category: "yes" },
  { patterns: [/^no+$/i, /^nope$/i, /^nah$/i, "not really", "i don't think so"], category: "no" },
  { patterns: [/^maybe$/i, "perhaps", "possibly", "not sure", "idk", "i don't know", "dunno"], category: "maybe" },
  { patterns: ["thank", "thanks", "thx", "ty", "tysm", "appreciate"], category: "thanks" },
  { patterns: ["sorry", "apolog", "my bad", "i'm sorry", "im sorry"], category: "sorry" },
  { patterns: [/^please$/i, /^pls$/i, "pretty please", "pwease"], category: "please" },
  
  // Fun topics
  { patterns: ["game", "gaming", "play", "video game", "videogame"], category: "game" },
  { patterns: ["music", "song", "sing", "listening to"], category: "music" },
  { patterns: ["anime", "manga", "otaku", "weeb"], category: "anime" },
  { patterns: ["movie", "film", "watch", "netflix", "show"], category: "movie" },
  { patterns: ["weather", "rain", "sunny", "cold", "hot", "warm"], category: "weather" },
  { patterns: ["sleep", "bed", "nap", "rest", "tired"], category: "sleep" },
  { patterns: ["work", "job", "busy", "working"], category: "work" },
  { patterns: ["school", "class", "study", "homework", "exam", "test"], category: "school" },
  
  // Misc conversational
  { patterns: [/^ok$/i, /^okay$/i, /^k$/i, "alright", "alrighty", "okie", "okey"], category: "ok" },
  { patterns: [/^lol$/i, /^lmao$/i, /^haha/i, /^hehe/i, "rofl", "😂", "🤣"], category: "lol" },
  { patterns: [/^wow$/i, "woah", "whoa", "amazing", "incredible", "omg", "oh my god"], category: "wow" },
  { patterns: [/^cool$/i, "awesome", "neat", "sick", "dope", "fire"], category: "cool" },
  { patterns: [/^nice$/i, "great", "good", "wonderful"], category: "nice" },
  
  // Help
  { patterns: ["help", "assist", "support", "what can you do", "can you help"], category: "help", personalized: true },
];

function getLocalResponse(message: string, context: { hunger: number; page: string; userName?: string; petName?: string }): string {
  const msg = message.toLowerCase().trim();
  const name = context.userName || "friend";
  const hasName = !!context.userName;
  
  // Priority 1: Context-based responses (override everything)
  if (context.hunger < 30) {
    const hungry = pickRandom(RESPONSES.hungry);
    return hasName ? hungry.replace("pwease", `pwease ${name}`) : hungry;
  }
  if (context.page === "/contact") {
    return pickRandom(RESPONSES.contact);
  }
  
  // Priority 2: Pattern matching against user message
  for (const matcher of PATTERN_MATCHERS) {
    for (const pattern of matcher.patterns) {
      const matches = typeof pattern === "string" 
        ? msg.includes(pattern)
        : pattern.test(msg);
      
      if (matches) {
        const responses = RESPONSES[matcher.category];
        if (!responses) continue;
        
        let response = pickRandom(responses);
        
        // Personalize with user's name if applicable
        if (matcher.personalized && hasName) {
          // Add name to response contextually
          const nameVariants = [
            { find: /^(Hiii?~?!?)/i, replace: `$1 ${name}` },
            { find: /^(Aww+)/i, replace: `$1 ${name}` },
            { find: /^(Nuuu)/i, replace: `Nuuu ${name}` },
            { find: /^(YAYYY?~?!?)/i, replace: `$1 ${name}!!` },
            { find: /^(\*[^*]+\*)/i, replace: `$1 ${name}~!` },
          ];
          
          let personalized = false;
          for (const variant of nameVariants) {
            if (variant.find.test(response)) {
              response = response.replace(variant.find, variant.replace);
              personalized = true;
              break;
            }
          }
          
          // If no pattern matched, prepend name with some probability
          if (!personalized && Math.random() > 0.5) {
            response = `${name}~! ${response}`;
          }
        }
        
        return response;
      }
    }
  }
  
  // Default - respond conversationally
  if (hasName) {
    return pickRandom([
      `Hehe~! ${name} you're fun to talk to! (⁠◕⁠ᴗ⁠◕⁠✿⁠)♡`,
      `*tilts head at ${name}* Interesting~! (⁠◕⁠‿⁠◕⁠)✨`,
      `Ooh ${name} tell me more~!! (⁠≧⁠▽⁠≦⁠)♪`,
      `I love chatting with you ${name}~! (⁠◕⁠ᴗ⁠◕⁠)💕`,
      `${name}~! *happy bouncing* (⁠ﾉ⁠◕⁠ヮ⁠◕⁠)⁠ﾉ⁠♡`,
      `${name} is the best~!! (⁠≧⁠◡⁠≦⁠)✨`,
      `What else is on your mind ${name}~? (⁠◕⁠ᴗ⁠◕⁠✿⁠)`,
      `${name} you're so interesting!! (⁠◕⁠‿⁠◕⁠)♡`,
    ]);
  }
  return pickRandom(RESPONSES.default);
}

export async function POST(req: Request) {
  try {
    const { message, context } = await req.json();

    if (!process.env.HF_TOKEN) {
      // No API key - use local fallback
      return NextResponse.json({ reply: getLocalResponse(message, context) });
    }

    const systemPrompt = `
      You are a cute, digital pet companion named ${context.petName || "Oshii"}.
      User: ${context.userName || "The Visitor"}
      Hunger: ${context.hunger}%
      Current Page: ${context.page}
      Style: Bubbly, short (under 15 words), use emojis like (⁠◕⁠ᴗ⁠◕⁠✿⁠).
      Rules: If hunger < 30, beg for cookies. If on /contact, say "Hire him!".
    `;

    // 2. Primary Model Attempt - Using Microsoft's Phi which has good availability
    try {
      const response = await hf.chatCompletion({
        model: "microsoft/Phi-3-mini-4k-instruct",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        max_tokens: 60,
        temperature: 0.7,
      });

      const reply = response.choices[0].message.content || getLocalResponse(message, context);
      return NextResponse.json({ reply: reply.trim() });

    } catch (providerError) {
      console.warn("⚠️ Primary model failed, attempting backup...", providerError);
      
      // 3. Backup Model Attempt - Mistral is very reliable
      try {
        const backupResponse = await hf.chatCompletion({
          model: "mistralai/Mistral-7B-Instruct-v0.3", 
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message }
          ],
          max_tokens: 60,
        });

        const backupReply = backupResponse.choices[0].message.content || getLocalResponse(message, context);
        return NextResponse.json({ reply: backupReply.trim() });
      } catch (backupError) {
        console.warn("⚠️ Backup model also failed, using local fallback");
        return NextResponse.json({ reply: getLocalResponse(message, context) });
      }
    }
    
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ FINAL HF ERROR:", errorMessage);
    
    // Use local fallback for any error
    try {
      const { message, context } = await req.json();
      return NextResponse.json({ reply: getLocalResponse(message, context) });
    } catch {
      return NextResponse.json({ reply: "Hehe! (⁠◕⁠ᴗ⁠◕⁠✿⁠)" });
    }
  }
}