# ECHOES — When Machines Tell Their Stories

### Their missions ended. Their stories didn't.

**NASA International Space Apps Challenge 2026** · **Challenge:** [Abandoned but Not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars](https://www.spaceappschallenge.org/2026/challenges/nasas-discarded-equipment-storytelling/)

**Website:** [futureechoes.design](https://futureechoes.design) 

---

## 🌌 About ECHOES

The Moon and Mars are home to remarkable machines that humanity left behind: rovers, landers, lunar vehicles, scientific instruments, and even a helicopter. Though many of their missions have ended, the discoveries they enabled continue to shape space exploration.

**ECHOES** is a free, interactive educational storytelling website that brings those histories to life for school-age learners and curious explorers. It combines NASA-sourced mission facts with fictional first-person narratives, a clickable planetary atlas, science investigations, and a personal learning passport.

Instead of reading a static catalog, visitors can **explore a world → meet a machine → experience its story → investigate its science → remember its legacy**.

> **Our purpose:** Make the science and human ingenuity behind historic NASA hardware understandable, engaging, and memorable—without confusing creative storytelling with documented history.

## ✨ Features

| Feature | What visitors can do |
| --- | --- |
| 🪐 **Interactive Planetary Atlas** | Switch between Mars and the Moon, then select spacecraft markers. The map is *schematic*, not a precise geographic map. |
| 📖 **48 Story Chapters** | Explore a three-chapter beginning, discovery, and legacy narrative for each of 16 artifacts. |
| 🔎 **Mission Archive & Timeline** | Search, filter, sort, and explore historic missions and milestones. |
| 🧩 **Mission Detective** | Answer 16 evidence-based questions with explanations grounded in NASA resources. |
| 🔬 **Science Lab** | Explore Ingenuity's **5 planned vs. 72 completed flights** and an illustrative dust/solar-light model. |
| 🔊 **Optional Read-Aloud** | Listen to story chapters using your browser's speech-synthesis feature, where supported. |
| 🛂 **Space Historian Passport** | Track completed stories and solved cases in local browser storage. |
| 🏅 **Certificate Generator** | Download a personalized PNG learning keepsake, generated entirely in the browser. |
| 📚 **NASA Source Links** | Open official source pages for each mission to verify historical information. |

## 🛰️ Meet the 16 Artifacts

**Mars — 9 artifacts**

- Ingenuity Helicopter
- Opportunity Rover
- Spirit Rover
- Sojourner Rover
- Viking 1 Lander
- Viking 2 Lander
- Phoenix Lander
- InSight Lander
- Mars Pathfinder Lander

**Moon — 7 artifacts**

- Apollo 11 *Eagle* Descent Stage
- Surveyor 3 Lander
- Apollo 15 Lunar Roving Vehicle
- Apollo 16 Lunar Roving Vehicle
- Apollo 17 Lunar Roving Vehicle
- Apollo 12 ALSEP Scientific Package
- Apollo 11 Laser Retroreflector

**One important distinction:** Not everything left on the Moon is scientifically inactive. The Apollo 11 laser retroreflector is a passive instrument that remains useful for lunar laser-ranging observations.

## 🧰 Technology Stack

| Technology | Purpose |
| --- | --- |
| **HTML5** | Semantic website structure and interactive content |
| **CSS3** | Responsive design, animation, and reduced-motion support |
| **Vanilla JavaScript** | Navigation, mission data, stories, quizzes, experiments, and learning progress |
| **SVG** | Bundled illustrated spacecraft and planetary artwork |
| **Web Speech API** | Optional browser-based narration |
| **Canvas API** | Locally generated PNG certificates |

**No backend. No database. No account required. No paid APIs. No external JavaScript frameworks.**


## 📁 Project Structure

```text
ECHOES/
├── index.html              # All website sections and mission-story views
├── css/
│   └── style.css           # Layout, responsive styling, and animation
├── js/
│   ├── data.js             # 16 mission records, stories, questions, sources
│   └── app.js              # Navigation, atlas, quizzes, labs, passport
│   └── image-urls.js       # real url links of images
├── assets/
│   ├── favicon.svg
│   └── images/             # 20 bundled SVG illustrations
├── NASA_SOURCES.md         # Mission-by-mission NASA research sources
├── HACKATHON_DEMO.md       # Demonstration notes and project pitch
├── LICENSE                 # MIT license
└── README.md
```

All mission records live in `js/data.js` as `window.ECHOES_DATA`. Each record includes mission identity, location, historical summary, scientific contribution, story chapters, a quiz, a source URL, and an illustration path.

## 📡 NASA Data and Research

ECHOES was developed in response to the challenge's requirement to **use NASA data and resources**. Its mission histories are linked to official NASA materials, including:

- [NASA Space Science Data Coordinated Archive (NSSDCA)](https://nssdc.gsfc.nasa.gov/)
- [NASA Ingenuity Mars Helicopter](https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/)
- [NASA Mars Pathfinder / Sojourner](https://science.nasa.gov/mission/mars-pathfinder/)
- [NASA Mars Exploration Rovers: Spirit and Opportunity](https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/)
- [NASA InSight](https://science.nasa.gov/mission/insight/)
- [NASA Surveyor 3](https://science.nasa.gov/mission/surveyor-3/)
- [NASA Apollo 11 Mission Overview](https://www.nasa.gov/history/apollo-11-mission-overview/)
- [International Laser Ranging Service: Apollo 11 Reflector](https://ilrs.gsfc.nasa.gov/missions/satellite_missions/current_missions/ap11_reflector.html)

For **all 16 artifact-specific references**, see [NASA_SOURCES.md](NASA_SOURCES.md).

### Scientific integrity

- **Historical facts:** Mission descriptions, dates, discoveries, and status are based on linked NASA sources. The date of *last contact* may differ from a mission's formal retirement date.
- **Fictional narration:** The spacecraft's first-person words are imagined educational storytelling—not actual transmissions, NASA quotations, or recorded speech.
- **Illustrations:** Artwork is stylized concept art, not NASA archival photography or scale-accurate engineering diagrams.
- **Planetary markers:** Atlas positions are artistic visual markers, not real latitude/longitude coordinates.
- **Science activities:** The dust-versus-sunlight activity is a simplified conceptual demonstration, **not** historical telemetry or a validated physical model.

## ♿ Accessibility and Privacy

ECHOES uses semantic headings, descriptive controls, illustration alt text, responsive layouts, keyboard-accessible interactions, a skip link, and reduced-motion CSS accommodations. Optional narration depends on the browser's installed speech voices.

The site does **not** require users to register. Story progress and quiz completion are stored on the visitor's device using `localStorage`. Certificate images are rendered and downloaded locally; there is no server-side collection of certificate names or progress.

## 🤖 AI / Super Intelligence (SI) Disclosure

**AI assistance was used in the development of this project.** OpenAI ChatGPT assisted with concept development, writing and structuring story content/

## 🧪 Suggested Demo Flow

1. Open the homepage and introduce the challenge in one sentence.
2. Enter **The Atlas**, switch between Mars and the Moon, and select a mission.
3. Open Ingenuity's three-chapter story and show its NASA source.
4. Answer a Mission Detective question and visit **My Passport**.
5. Demonstrate the **5 planned / 72 completed flights** interaction in the Science Lab.
6. Show the NASA sources and the downloadable certificate.
---

**ECHOES — When Machines Tell Their Stories**  
*They explored for us. Now we remember them.*
