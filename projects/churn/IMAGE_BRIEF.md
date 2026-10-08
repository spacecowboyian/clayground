# Churn — Image Brief

Images needed for the **Churn** landing page, a parody "Tinder for the Amish."
Tagline: *Find your butter half.*

The page is built around an **Amish quilt** look:
- Solid jewel-tone quilt geometry on a near-black background.
- Butter yellow as the one brand color.
- **Cut-paper silhouette portraits** in place of photos. The joke is that graven images are frowned upon, so every single gets a silhouette cut by "a cousin who is very good with scissors."

Right now everything is drawn in code as placeholders. These images replace or upgrade them.

---

## Delivery specs

- **Where:** drop files into `projects/churn/src/assets/` using the exact filenames below.
- **Format:**
  - PNG for silhouettes, icons and anything that needs transparency.
  - JPG (quality ~85) for photos.
- **Size:** at least the listed resolution. Bigger is fine; it gets scaled down.
- **Silhouettes:** if your tool can do it, export the black figure on a **transparent background** as well as on cream. Transparent is preferred, since the page supplies the cream oval.
- **No text in images** unless noted. Generators garble lettering, so headlines get added in code.

---

## Palette (use these exact colors)

| Name | Hex | Used for |
|---|---|---|
| Ink | `#1a1612` | Silhouette black |
| Paper | `#f3ead6` | Cream paper behind silhouettes |
| Butter | `#f4c542` | Brand yellow |
| Butter deep | `#d8a51c` | Darker yellow accents |
| Quilt ground | `#15111a` | Near-black aubergine page background |
| Plum | `#5e2a5c` | Quilt cloth |
| Wine | `#7a1f33` | Quilt cloth |
| Teal | `#1f5e63` | Quilt cloth |
| Cobalt | `#2d3f8f` | Quilt cloth |
| Moss | `#3d5e2a` | Quilt cloth |

---

## Shared silhouette style

Append this to **every silhouette prompt** (#1–#8 and #14) so the set matches:

> Traditional Pennsylvania Dutch scherenschnitte cut-paper silhouette, 19th-century American folk-art profile portrait, solid matte black paper (#1a1612) on plain warm cream paper (#f3ead6), crisp hand-cut scissor edges, subtle paper grain, perfectly flat, no gradients, no shading, no frame, centered, head-and-shoulders bust, facing right, shoulders touching the bottom edge.

**Negative prompt** (if supported):

> photo, 3D, gradient, glow, color, text, watermark, frame, oval border, mustache, modern clothing

**Cultural accuracy notes:**
- **Amish men:** clean-shaven until married. Married men grow a beard on the chin and jaw only, **never a mustache**.
- **Women:** a white prayer **kapp** (heart-shaped in Lancaster County, covering a low bun). Outdoors they wear a deep **black bonnet**. Dresses are plain, with a cape over the shoulders.
- **Hats:** wide-brimmed straw for summer work, black felt with a flat brim for church and dress.
- **No real faces in photographic images.** Many Amish people object to being photographed. Keep people as silhouettes, and keep photos to landscapes, buggies and objects.

---

## Priority 1: profile silhouettes

These go inside the oval cameo on each swipe card and on the "It's a match" screen. The cameo crops to an oval, so keep the head well inside the frame with some breathing room at the top.

**All seven:** 4:5 portrait, 800×1000 or larger, PNG.

### 1. `sil-ezekiel.png` — Ezekiel, 24
*"Raised 3 barns this summer. Can tell a Belgian from a Percheron at 200 yards."*
> Young Amish man aged about 24, clean-shaven with no beard, wide-brimmed flat straw hat with a black band, collared work shirt, suspender strap visible at the shoulder. *(+ shared style)*

### 2. `sil-miriam.png` — Miriam, 22
*"I churn 40 lbs of butter a week and I still have time for you."*
> Young Amish woman aged about 22, white organdy prayer kapp shaped like a heart covering a low bun, ties hanging loose down the neck, cape dress collar, slender neck. Cut the kapp's front edge and ties out as thin cream lines so the cap reads clearly. *(+ shared style)*

### 3. `sil-jebediah.png` — Jebediah, 27
*"Looking for a wife so the beard can finally come in."*
> Amish man aged about 27, clean-shaven with an earnest, hopeful expression in the profile, tall black felt hat with a flat brim, plain collarless coat. *(+ shared style)*

### 4. `sil-hannah.png` — Hannah, 23
*"Rumspringa survivor: I saw a Walmart once and I did not care for it."*
> Young Amish woman aged about 23, deep black outdoor bonnet whose brim projects forward past the forehead so only the tip of the nose and chin peek out, ribbon bow tied under the chin. *(+ shared style)*

### 5. `sil-amos.png` — Amos, 25
*"I own my own horse (Doug). Doug comes first."*
> Amish man aged about 25, clean-shaven, wide-brimmed straw hat. A draft horse's head (Doug) leans into the frame from behind his shoulder, also in silhouette, ears perked. *(+ shared style)*

### 6. `sil-ruth.png` — Ruth, 21
*"Must love shoofly pie."*
> Young Amish woman aged about 21, white prayer kapp with a center-parted hairline visible at the front, a small bun, holding a pie raised slightly into the bottom of the frame. *(+ shared style)*

### 7. `sil-levi.png` — Levi, 26
*"Hook-and-eye guy. The beard is a long story."*
> Amish man aged about 26, black brimmed felt hat, full chin-and-jaw beard with no mustache (the defining Amish style), plain coat with a hook-and-eye collar. *(+ shared style)*

---

## Priority 1: wedding silhouette

### 8. `sil-wedding.png` — Stories section ("Matched on Churn")
**5:4 landscape, 1200×960 or larger, PNG.**
Sits beside the quote: *"I swiped right on Eli in March. By November we had raised a barn, a silo, and eleven goats." (Sarah & Eli)*
> A courting Amish couple in profile, facing each other, cut from a single sheet of paper. Left: a woman in a heart-shaped prayer kapp. Right: a man in a black brimmed hat with a chin beard and no mustache. Their noses are almost touching, a tiny cut-paper heart floats between them, and a small barn-and-silo silhouette sits on the horizon below. *(+ shared style, but facing each other instead of facing right)*

---

## Priority 2: sharing and brand

### 9. `og-image.png` — social share preview
**1200×630, PNG.** Shown when the link is shared in iMessage, Slack, etc.
> Flat graphic. On the left half, an Amish Center Diamond quilt: plum (#5e2a5c) outer border, wine (#7a1f33) field, teal (#1f5e63) diamond, small plum square in the center, with visible hand-quilting stitch lines. On the right half, plain near-black (#15111a) empty space for headline text. Solid colors, crisp geometry, no text.

*(The headline "Find your* butter half.*" gets added afterwards in the Fraunces font.)*

### 10. `icon.png` — app icon and favicon
**1024×1024 square, PNG.**
> Minimal app icon: a butter-yellow (#f4c542) wooden butter churn with a cream dasher handle sticking out the top and two darker-yellow (#d8a51c) hoop bands, centered on a near-black aubergine (#15111a) rounded square. Flat vector style, no text, no gradients.

---

## Priority 3: richness

### 11. `quilt-fabric.png` — fabric texture overlay
**1024×1024, seamless tile, PNG.** Laid over the code-drawn quilts at low opacity so they read as cloth.
> Seamless tileable macro texture of plain-weave cotton quilting fabric with faint hand-quilting stitch dimples, neutral mid-grey, evenly lit, no pattern, no seams, no color.

### 12. `hero-dusk.jpg` — hero atmosphere photo
**16:9, 2400×1350 or larger, JPG.** Sits softly behind the hero quilt.
> Cinematic film photograph of rolling Lancaster County farmland at dusk. A lone horse-drawn black buggy seen from behind on a gravel road, warm lantern glow, a red barn and silo in the distance, deep plum and indigo sky fading to butter yellow at the horizon. Quiet and romantic, shot on Portra 400, soft grain, no faces visible.

### 13. `bulletin-board.png` — closing call-to-action prop
**4:3, 1200×900, transparent PNG** (board cut out).
Joke: *"Available wherever bulletin boards are found."*
> Top-down photo of a weathered wooden general-store bulletin board with handwritten index cards pinned on it: "CHURN — sign up here", "Buggy for sale", "Quilting bee Thursday". Brass pushpins, kraft paper, warm daylight, shallow depth of field.

*(This one does need text on the cards. If the generator garbles it, leave the cards blank and we'll add the text in code.)*

### 14. `empty-district.png` — end-of-deck illustration
**1:1, 800×800, PNG.** Shown when you've swiped through everyone: *"That's everyone in the district."*
> Cut-paper silhouette of an empty wooden church bench with a single straw hat resting on it, a lantern beside it, a crescent moon above. *(+ shared style, minus the "head-and-shoulders bust" part)*

---

## Checklist

| # | File | Size | Priority |
|---|---|---|---|
| 1 | `sil-ezekiel.png` | 800×1000 | P1 |
| 2 | `sil-miriam.png` | 800×1000 | P1 |
| 3 | `sil-jebediah.png` | 800×1000 | P1 |
| 4 | `sil-hannah.png` | 800×1000 | P1 |
| 5 | `sil-amos.png` | 800×1000 | P1 |
| 6 | `sil-ruth.png` | 800×1000 | P1 |
| 7 | `sil-levi.png` | 800×1000 | P1 |
| 8 | `sil-wedding.png` | 1200×960 | P1 |
| 9 | `og-image.png` | 1200×630 | P2 |
| 10 | `icon.png` | 1024×1024 | P2 |
| 11 | `quilt-fabric.png` | 1024×1024 tile | P3 |
| 12 | `hero-dusk.jpg` | 2400×1350 | P3 |
| 13 | `bulletin-board.png` | 1200×900 | P3 |
| 14 | `empty-district.png` | 800×800 | P3 |

**Tip for consistency:** generate the 7 profile silhouettes in one session with the same seed and style reference. Pick the best one first and use it as the image reference for the rest so the scissor-cut style matches across the set.
