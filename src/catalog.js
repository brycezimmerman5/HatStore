export const SHIPPING_RATE = 8;

export const collections = [
  {
    id: "truckers",
    name: "Patch Truckers",
    eyebrow: "Coastal",
    line: "Foam fronts, mesh backs, and patches meant to be read from across the lot.",
    image: "/hats/out-of-office-front.webp",
  },
  {
    id: "straw",
    name: "Western Straw",
    eyebrow: "Festival & trail",
    line: "Open-weave cowboys with conchos, turquoise, and flowers along the brim.",
    image: "/hats/cowboy-floral.webp",
  },
  {
    id: "raffia",
    name: "Crochet & Raffia",
    eyebrow: "Packable shade",
    line: "Scalloped crochet, ribbon-brim sun hats, tie-bow cloches, and a raffia bucket.",
    image: "/hats/scallop-ivory.webp",
  },
  {
    id: "canvas",
    name: "Canvas Sun Hats",
    eyebrow: "All-day brim",
    line: "One deep crown and a rolled brim, cut in ten steady colors.",
    image: "/hats/canvas-coral.webp",
  },
];

const careCopy = {
  truckers:
    "Spot-clean the patch with a damp cloth and let the mesh air dry. Curve the brim once with warm hands if you want it shaped, then leave it.",
  straw:
    "Keep straw dry. Reshape the brim with your hands, and use a little steam only if a brim edge has gone flat. Store it out of a hot car, crown up.",
  raffia:
    "Crochet and raffia prefer shade when they are off your head. Reshape the brim while the hat is dry. Do not fold the crown flat in a bag.",
  canvas:
    "Spot-clean and air dry. The rolled brim can be coaxed back into shape while the cloth is just barely damp.",
};

function hat(partial) {
  return {
    care: careCopy[partial.category],
    featured: false,
    inStock: false,
    pocket: false,
    ...partial,
  };
}

export const stockShelf = {
  id: "stock",
  name: "In stock",
  eyebrow: "Ready to ship",
  line: "These hats are on the shelf now. The rest of the shop is the lookbook.",
};

export const products = [
  hat({
    id: "out-of-office",
    name: "Out of Office",
    price: 42,
    category: "truckers",
    featured: true,
    fit: "Adjustable snapback",
    description:
      "Hot pink, on purpose. A cream patch carries three embroidered shells — magenta, coral, and gold — under the words. Front, interior, and back are all here so you can see the terry sweatband and the snap.",
    details: [
      "Structured foam front",
      "Breathable mesh back",
      "Adjustable snapback",
      "Embroidered shell patch with a blue stitch border",
    ],
    colors: [
      {
        name: "Hot Pink",
        hex: "#ff3b8d",
        images: [
          "/hats/out-of-office-front.webp",
          "/hats/out-of-office-interior.webp",
          "/hats/out-of-office-back.webp",
        ],
        views: ["front", "interior", "back"],
      },
    ],
  }),
  hat({
    id: "all-is-well",
    name: "All Is Well",
    price: 54,
    category: "truckers",
    featured: true,
    inStock: true,
    fit: "Adjustable snapback",
    description:
      "A black trucker with a cream patch, an orange stitch border, and a small sun over four colored waves. ALL IS WELL sits underneath in dark block letters. The inside and the back are here too: a cream sweatband, mesh, and the snap.",
    details: [
      "Black foam front and mesh",
      "Embroidered sun-and-wave patch",
      "Orange stitch border",
      "Adjustable snapback",
    ],
    colors: [
      {
        name: "Black",
        hex: "#1c1c1c",
        images: [
          "/hats/all-is-well-front.webp",
          "/hats/all-is-well-interior.webp",
          "/hats/all-is-well-back.webp",
        ],
        views: ["front", "interior", "back"],
      },
    ],
  }),
  hat({
    id: "cool-your-jets",
    name: "Cool Your Jets",
    price: 54,
    category: "truckers",
    featured: true,
    inStock: true,
    fit: "Adjustable snapback",
    description:
      "Some days just call for it. The early wake-up, the coffee that went cold, the group text that would not quit. A brown foam trucker with a Smokey the Bear patch and a small rainbow arcing over Cool Your Jets. Foam front, brown mesh back, and an adjustable snap that fits whoever grabs it first.",
    details: [
      "Structured foam front",
      "Embroidered Cool Your Jets patch",
      "Vintage Smokey Bear artwork",
      "Brown mesh back",
      "Adjustable snapback",
      "Unisex fit",
    ],
    colors: [
      {
        name: "Brown",
        hex: "#5c4034",
        images: [
          "/hats/cool-your-jets-front.webp",
          "/hats/cool-your-jets-side.webp",
          "/hats/cool-your-jets-back.webp",
        ],
        views: ["front", "side", "back"],
      },
    ],
  }),
  hat({
    id: "stay-wild",
    name: "Stay Wild",
    price: 54,
    category: "truckers",
    featured: true,
    inStock: true,
    fit: "Adjustable snapback",
    description:
      "The plan was one night camping. It is now three and nobody wants to leave. A brown foam trucker with a Smokey the Bear patch and STAY WILD stitched above him. Mesh back, an adjustable snap, a terry sweatband, and a padded rim. Brown already goes with the denim, the cream sweater, and the boots.",
    details: [
      "Structured foam front",
      "Embroidered Stay Wild patch",
      "Vintage Smokey Bear artwork",
      "Brown mesh back",
      "Terry sweatband and padded rim",
      "Adjustable snapback",
      "One size, fits 54–60 cm",
    ],
    colors: [
      {
        name: "Brown",
        hex: "#5c4034",
        images: [
          "/hats/stay-wild-front.webp",
          "/hats/stay-wild-interior.webp",
          "/hats/stay-wild-back.webp",
        ],
        views: ["front", "interior", "back"],
      },
    ],
  }),
  hat({
    id: "surf-california-navy",
    name: "Surf California",
    price: 54,
    category: "truckers",
    featured: true,
    inStock: true,
    fit: "Adjustable snapback",
    description:
      "California, in the version where you actually get in the water. A navy foam trucker with white SURF CALIFORNIA lettering across the front. Mesh back, an adjustable snap, a terry sweatband, and a padded rim. Navy and white go with the rash guard, the denim, and the striped thing you always pack.",
    details: [
      "Structured foam front",
      "Embroidered Surf California lettering",
      "Navy mesh back",
      "Terry sweatband and padded rim",
      "Adjustable snapback",
      "One size, fits 54–60 cm",
    ],
    colors: [
      {
        name: "Navy",
        hex: "#1c2a44",
        images: ["/hats/surf-california-navy-front.webp", "/hats/surf-california-navy-back.webp"],
        views: ["front", "back"],
      },
    ],
  }),
  hat({
    id: "third-eye",
    name: "Third Eye",
    price: 54,
    category: "truckers",
    featured: true,
    inStock: true,
    fit: "Adjustable snapback",
    description:
      "You are aware. Just not before coffee. A black foam trucker with a round embroidered eye on the front panel, a sun arc above it. Mesh back, an adjustable snap, a terry sweatband, and a padded rim. Black is the one you do not think about. It just works.",
    details: [
      "Structured foam front",
      "Embroidered eye patch",
      "Black mesh back",
      "Terry sweatband and padded rim",
      "Adjustable snapback",
      "One size, fits 54–60 cm",
    ],
    colors: [
      {
        name: "Black",
        hex: "#1c1c1c",
        images: [
          "/hats/third-eye-front.webp",
          "/hats/third-eye-interior.webp",
          "/hats/third-eye-back.webp",
        ],
        views: ["front", "interior", "back"],
      },
    ],
  }),
  hat({
    id: "sunshine-sunsets",
    name: "Sunshine and Sunsets",
    price: 54,
    category: "truckers",
    featured: true,
    inStock: true,
    fit: "Adjustable snapback",
    description:
      "Chasing the light from the first cup to the last one. A brown foam trucker with a round patch: a sun, three waves, and SUNSHINE AND SUNSETS curved around the edge. Mesh back, an adjustable snap, a terry sweatband, and a padded rim. Brown is the warm neutral, over the cream, the denim, the olive.",
    details: [
      "Structured foam front",
      "Embroidered Sunshine and Sunsets patch",
      "Brown mesh back",
      "Terry sweatband and padded rim",
      "Adjustable snapback",
      "One size, fits 54–60 cm",
    ],
    colors: [
      {
        name: "Brown",
        hex: "#5c3a2a",
        images: [
          "/hats/sunshine-sunsets-front.webp",
          "/hats/sunshine-sunsets-interior.webp",
          "/hats/sunshine-sunsets-back.webp",
        ],
        views: ["front", "interior", "back"],
      },
    ],
  }),
  hat({
    id: "encinitas-surf",
    name: "Encinitas Surf",
    price: 45,
    category: "truckers",
    featured: true,
    inStock: true,
    pocket: true,
    fit: "Adjustable snapback",
    description:
      "A black pocket hat for Encinitas. Three surfboards — orange, gold, and pale blue — sit beside the name, with California in small letters under an orange stripe. Hand-sewn in the San Francisco Bay Area. The pocket holds an ID, cash, or cards, and the snap adjusts.",
    details: [
      "Embroidered Encinitas surfboard patch",
      "Pocket for an ID, cash, or cards",
      "Foam front and mesh back",
      "Adjustable snapback",
      "Hand-sewn in the San Francisco Bay Area",
    ],
    colors: [
      {
        name: "Black",
        hex: "#1c1c1c",
        images: ["/hats/encinitas-surf-front.webp", "/hats/encinitas-surf-side.webp"],
        views: ["front", "side"],
      },
    ],
  }),
  hat({
    id: "california-poppy",
    name: "California Poppy",
    price: 45,
    category: "truckers",
    featured: true,
    inStock: true,
    pocket: true,
    fit: "Adjustable snapback",
    description:
      "A black pocket hat with the California patch in poppies: orange blooms on a green hill, a strip of water, and the name in red script. Hand-sewn in the San Francisco Bay Area. The pocket holds an ID, cash, or cards, and the snap adjusts.",
    details: [
      "Embroidered California poppy patch",
      "Pocket for an ID, cash, or cards",
      "Foam front and mesh back",
      "Adjustable snapback",
      "Hand-sewn in the San Francisco Bay Area",
    ],
    colors: [
      {
        name: "Black",
        hex: "#1c1c1c",
        images: ["/hats/california-poppy-front.webp", "/hats/california-poppy-side.webp"],
        views: ["front", "side"],
      },
    ],
  }),
  hat({
    id: "california-palms",
    name: "California Palms",
    price: 45,
    category: "truckers",
    featured: true,
    inStock: true,
    pocket: true,
    fit: "Adjustable snapback",
    description:
      "A black pocket hat with two palms, a small bird, and sunset stripes under California in black script. Hand-sewn in the San Francisco Bay Area. The pocket holds an ID, cash, or cards, and the snap adjusts.",
    details: [
      "Embroidered California palms patch",
      "Pocket for an ID, cash, or cards",
      "Foam front and mesh back",
      "Adjustable snapback",
      "Hand-sewn in the San Francisco Bay Area",
    ],
    colors: [
      {
        name: "Black",
        hex: "#1c1c1c",
        images: ["/hats/california-palms-front.webp", "/hats/california-palms-side.webp"],
        views: ["front", "side"],
      },
    ],
  }),
  hat({
    id: "cardiff-by-the-sea",
    name: "Cardiff by the Sea",
    price: 45,
    category: "truckers",
    featured: true,
    inStock: true,
    pocket: true,
    fit: "Adjustable snapback",
    description:
      "A black pocket hat with a navy brim. The patch puts Cardiff by the Sea in script over a blue field, a surfer in a red circle, and California along the gold bar. Hand-sewn in the San Francisco Bay Area. The pocket holds an ID, cash, or cards, and the snap adjusts.",
    details: [
      "Embroidered Cardiff-by-the-Sea patch",
      "Navy brim",
      "Pocket for an ID, cash, or cards",
      "Foam front and mesh back",
      "Adjustable snapback",
      "Hand-sewn in the San Francisco Bay Area",
    ],
    colors: [
      {
        name: "Black",
        hex: "#1c1c1c",
        images: ["/hats/cardiff-front.webp", "/hats/cardiff-side.webp", "/hats/cardiff-angle.webp"],
        views: ["front", "side", "angle"],
      },
    ],
  }),
  hat({
    id: "san-diego-kiss",
    name: "San Diego, The Kiss",
    price: 45,
    category: "truckers",
    featured: true,
    inStock: true,
    pocket: true,
    fit: "Adjustable snapback",
    description:
      "A black pocket hat with San Diego in gold script, a yellow California bar, and the sailor's kiss on the right of the patch. Hand-sewn in the San Francisco Bay Area. The pocket holds an ID, cash, or cards, and the snap adjusts.",
    details: [
      "Embroidered San Diego kiss patch",
      "Pocket for an ID, cash, or cards",
      "Foam front and mesh back",
      "Adjustable snapback",
      "Hand-sewn in the San Francisco Bay Area",
    ],
    colors: [
      {
        name: "Black",
        hex: "#1c1c1c",
        images: ["/hats/san-diego-kiss-front.webp", "/hats/san-diego-kiss-side.webp"],
        views: ["front", "side"],
      },
    ],
  }),
  hat({
    id: "san-diego-beach",
    name: "San Diego Beach",
    price: 45,
    category: "truckers",
    featured: true,
    inStock: true,
    pocket: true,
    fit: "Adjustable snapback",
    description:
      "A black pocket hat with San Diego in gold script over a sunset, a green palm, and California on the orange band. Hand-sewn in the San Francisco Bay Area. The pocket holds an ID, cash, or cards, and the snap adjusts.",
    details: [
      "Embroidered San Diego beach patch",
      "Pocket for an ID, cash, or cards",
      "Foam front and mesh back",
      "Adjustable snapback",
      "Hand-sewn in the San Francisco Bay Area",
    ],
    colors: [
      {
        name: "Black",
        hex: "#1c1c1c",
        images: [
          "/hats/san-diego-beach-front.webp",
          "/hats/san-diego-beach-side.webp",
          "/hats/san-diego-beach-angle.webp",
        ],
        views: ["front", "side", "angle"],
      },
    ],
  }),
  hat({
    id: "original-cotton",
    name: "Original Cotton",
    price: 40,
    category: "raffia",
    featured: true,
    inStock: true,
    fit: "One size, 57 cm",
    description:
      "The hat that started it all. Cute, and sun smart. The relaxed brim frames the face for a timeless, picture-perfect look. Natural, black, or tan.",
    details: [
      "Packable",
      "4 inch brim",
      "Hat size 57 cm",
      "One size",
      "100% cotton",
      "UPF 50",
    ],
    care: "It packs. Once it is out of the bag, reshape the brim with your hands. Keep it out of a hot shut car.",
    colors: [
      { name: "Natural", hex: "#dfd0ba", images: ["/hats/chl5-natural.webp"] },
      { name: "Black", hex: "#14181a", images: ["/hats/chl5-black.webp"] },
      { name: "Tan", hex: "#b7a67a", images: ["/hats/chl5-tan.webp"] },
    ],
  }),
  hat({
    id: "scalloped-cotton",
    name: "Scalloped Cotton",
    price: 40,
    category: "raffia",
    featured: true,
    inStock: true,
    fit: "One size, 57 cm",
    description:
      "The sister to the handmade original cotton crochet. A scalloped edge with the same crocheted style. It stores easily, and the brim still gives real sun protection.",
    details: [
      "Scalloped brim",
      "Packable",
      "4 inch brim",
      "Hat size 57 cm",
      "One size",
      "100% cotton",
      "UPF 50",
    ],
    care: "It packs. Once it is out of the bag, reshape the brim with your hands. Keep it out of a hot shut car.",
    colors: [{ name: "Natural", hex: "#eae3c5", images: ["/hats/chl1-natural.webp"] }],
  }),
  hat({
    id: "fine-crochet-bucket",
    name: "Fine Crochet Bucket",
    price: 35,
    category: "raffia",
    featured: true,
    inStock: true,
    fit: "One size, adjustable drawstring",
    description:
      "A finely crocheted classic straw bucket. It packs, and it is an easy one for travel. Dark natural, light pink, or black.",
    details: [
      "Handmade",
      "Shapeable wire brim",
      "Adjustable drawstring",
      "100% Toyo straw",
      "3 inch brim",
    ],
    care: "The wire brim shapes with your hands. It packs flat for a bag. Keep it out of a hot shut car.",
    colors: [
      { name: "Dark natural", hex: "#9a7040", images: ["/hats/toyo-bucket-dark-natural.webp"] },
      { name: "Light pink", hex: "#f0c4ae", images: ["/hats/toyo-bucket-pink.webp"] },
      { name: "Black", hex: "#1c1c1c", images: ["/hats/toyo-bucket-black.webp"] },
    ],
  }),
  hat({
    id: "fine-crochet-sun",
    name: "Fine Crochet Sun Hat",
    price: 43,
    category: "raffia",
    featured: true,
    inStock: true,
    fit: "One size, adjustable drawstring",
    description:
      "Finely crocheted Toyo straw, with a wire brim you can shape and a crown that folds for the bag. Black, grey, or rust.",
    details: [
      "Handmade",
      "Shapeable wire brim",
      "Packable and foldable",
      "Adjustable inner drawstring",
      "100% Toyo straw",
      "3.75 inch brim",
    ],
    care: "The wire brim shapes with your hands. It packs flat for a bag. Keep it out of a hot shut car.",
    colors: [
      { name: "Black", hex: "#161614", images: ["/hats/toyo-sun-black.webp"] },
      {
        name: "Grey",
        hex: "#9f8e86",
        images: ["/hats/toyo-sun-grey.webp", "/hats/toyo-sun-grey-under.webp"],
        views: ["side", "under"],
      },
      { name: "Rust", hex: "#c4622d", images: ["/hats/toyo-sun-rust.webp"] },
    ],
  }),
  hat({
    id: "shell-trim-raffia",
    name: "Shell Trim Raffia",
    price: 65,
    category: "raffia",
    featured: true,
    inStock: true,
    fit: "One size, adjustable drawstring",
    description:
      "Fine raffia crochet with a split back. A braided raffia band is studded with natural seashell fragments. Brown, natural, or black.",
    details: [
      "Handmade",
      "100% natural raffia straw",
      "Adjustable inner drawstring",
      "Shapeable wire brim",
      "Packable",
      "4 inch brim",
      "Split back",
      "Braided raffia trim with seashell fragments",
    ],
    care: "The wire brim shapes with your hands. It packs flat for a bag. Keep it out of a hot shut car, and keep the shells dry.",
    colors: [
      { name: "Brown", hex: "#8a4e2a", images: ["/hats/shell-raffia-brown.webp"] },
      { name: "Natural", hex: "#d7b98a", images: ["/hats/shell-raffia-natural.webp"] },
      { name: "Black", hex: "#1c1c1c", images: ["/hats/shell-raffia-black.webp"] },
    ],
  }),
  hat({
    id: "born-to-beach",
    name: "Born to Beach",
    price: 38,
    category: "truckers",
    fit: "Adjustable snapback",
    description:
      "A sand-colored trucker with a white patch, turquoise stitching, and gold letters stacked like a postcard. The mesh is the same warm khaki as the crown.",
    details: [
      "Khaki foam front and mesh",
      "White patch with turquoise border",
      "Gold embroidery",
      "Adjustable snapback",
    ],
    colors: [{ name: "Sand", hex: "#c6ae8c", images: ["/hats/born-to-beach.webp"] }],
  }),
  hat({
    id: "ocean-calling",
    name: "The Ocean Is Calling",
    price: 36,
    category: "truckers",
    fit: "Adjustable snapback",
    description:
      "Black on black, except for a chalk-white circle that says the quiet part out loud. The patch is stitched, not printed, so the letters have a little tooth.",
    details: [
      "Black foam front and mesh",
      "White chain-stitch circle patch",
      "Adjustable snapback",
    ],
    colors: [{ name: "Black", hex: "#1c1c1c", images: ["/hats/ocean-calling.webp"] }],
  }),
  hat({
    id: "surf-california",
    name: "Surf California",
    price: 42,
    category: "truckers",
    fit: "Adjustable snapback",
    description:
      "Woodland camo with hot-pink block letters across the front panel. It is the loudest trucker in the case, and it knows it.",
    details: [
      "Camo foam front and mesh",
      "Pink puff-style lettering",
      "Adjustable snapback",
    ],
    colors: [
      {
        name: "Camo",
        hex: "#4d5538",
        swatch: "linear-gradient(135deg,#3e4a32 0 32%,#6e5b3c 32% 58%,#2a3124 58% 78%,#8a7b56 78% 100%)",
        images: ["/hats/surf-california.webp"],
      },
    ],
  }),
  hat({
    id: "salty-moms",
    name: "Salty Moms Club",
    price: 38,
    category: "truckers",
    fit: "Adjustable snapback",
    description:
      "A square patch, a line of waves, and a low sun. The same club, in black or in the pink that matches a sunset you stayed out for.",
    details: [
      "Foam front, mesh back",
      "Embroidered wave patch",
      "Black or hot pink",
      "Adjustable snapback",
    ],
    colors: [
      { name: "Black", hex: "#1c1c1c", images: ["/hats/salty-moms-black.webp"] },
      { name: "Hot Pink", hex: "#ff4b93", images: ["/hats/salty-moms-pink.webp"] },
    ],
  }),
  hat({
    id: "rad-sunset",
    name: "Rad",
    price: 36,
    category: "truckers",
    fit: "Adjustable snapback",
    description:
      "Horizontal bands of rust, amber, blush, and teal, with RAD stitched across the lower stripe. A black trucker that does the talking in color.",
    details: [
      "Black foam front and mesh",
      "Rectangular sunset patch",
      "Adjustable snapback",
    ],
    colors: [{ name: "Black", hex: "#1c1c1c", images: ["/hats/rad-sunset.webp"] }],
  }),
  hat({
    id: "lightning-bolt",
    name: "Lightning Bolt",
    price: 36,
    category: "truckers",
    fit: "Adjustable snapback",
    description:
      "A round patch with a black bolt over a thin rainbow. Choose the olive crown or the black one — the patch stays the same dusty gold.",
    details: [
      "Foam front, mesh back",
      "Circular bolt patch",
      "Olive or black",
      "Adjustable snapback",
    ],
    colors: [
      { name: "Olive", hex: "#6a6434", images: ["/hats/bolt-olive.webp"] },
      { name: "Black", hex: "#1c1c1c", images: ["/hats/bolt-black.webp"] },
    ],
  }),
  hat({
    id: "day-drinking",
    name: "Support Day Drinking",
    price: 36,
    category: "truckers",
    fit: "Adjustable snapback",
    description:
      "Black block letters on a white patch, finished with a bright orange stitch. It comes in woodland camo or a straight red.",
    details: [
      "Foam front, mesh back",
      "Square patch with orange border",
      "Camo or red",
      "Adjustable snapback",
    ],
    colors: [
      {
        name: "Camo",
        hex: "#4d5538",
        swatch: "linear-gradient(135deg,#3e4a32 0 32%,#6e5b3c 32% 58%,#2a3124 58% 78%,#8a7b56 78% 100%)",
        images: ["/hats/day-drinking-camo.webp"],
      },
      { name: "Red", hex: "#d6453d", images: ["/hats/day-drinking-red.webp"] },
    ],
  }),
  hat({
    id: "mother",
    name: "Mother",
    price: 42,
    category: "truckers",
    featured: true,
    fit: "Adjustable snapback",
    description:
      "Navy trucker, yellow oval, blue letters, and a lightning bolt standing in for the O. A one-word patch with a little voltage.",
    details: [
      "Navy foam front",
      "Navy mesh back",
      "Yellow oval patch with blue stitch",
      "Adjustable snapback",
    ],
    colors: [{ name: "Navy", hex: "#1d2a44", images: ["/hats/mother.webp"] }],
  }),
  hat({
    id: "raisin-hell",
    name: "Raisin' Hell",
    price: 38,
    category: "truckers",
    fit: "One size",
    description:
      "Cream crown, red brim, and chain-stitch script that slants like a signature. A structured cap rather than a full mesh trucker — the two-tone is the whole idea.",
    details: [
      "Cream front panels",
      "Red brim",
      "Red chain-stitch lettering",
      "Structured crown",
    ],
    colors: [{ name: "Cream / Red", hex: "#f2eadc", images: ["/hats/raisin-hell.webp"] }],
  }),
  hat({
    id: "cowboys-tequila",
    name: "Cowboys & Tequila",
    price: 42,
    category: "truckers",
    fit: "Adjustable snapback",
    description:
      "A black trucker with a boxed patch: white letters, a gold border, and a bright blue ampersand doing more than its share of the work.",
    details: [
      "Black foam front and mesh",
      "Gold-bordered rectangular patch",
      "Blue embroidered ampersand",
      "Adjustable snapback",
    ],
    colors: [{ name: "Black", hex: "#1c1c1c", images: ["/hats/cowboys-tequila.webp"] }],
  }),
  hat({
    id: "pray-cowboys",
    name: "Pray for Cowboys",
    price: 36,
    category: "truckers",
    fit: "Adjustable snapback",
    description:
      "A horseshoe in the middle, the words around the rim, and a tan merrow edge on a black crown. Western, but it still sits like a trucker.",
    details: [
      "Black foam front and mesh",
      "Circular horseshoe patch",
      "Tan stitch border",
      "Adjustable snapback",
    ],
    colors: [{ name: "Black", hex: "#1c1c1c", images: ["/hats/pray-cowboys.webp"] }],
  }),
  hat({
    id: "local-legend",
    name: "Local Legend",
    price: 42,
    category: "truckers",
    featured: true,
    fit: "One size",
    description:
      "Cream crown, denim brim, and narrow side stripes in red, blue, and black. LOCAL sits small above a red script Legend. It is the dressiest of the patch caps.",
    details: [
      "Cream front",
      "Denim brim",
      "Striped side panels",
      "Red chain-stitch script",
    ],
    colors: [{ name: "Cream / Denim", hex: "#d7c4a4", images: ["/hats/local-legend.webp"] }],
  }),
  hat({
    id: "yall",
    name: "Y'all",
    price: 34,
    category: "truckers",
    fit: "Adjustable snapback",
    description:
      "Four big letters, a red underline, and nothing else competing. Black trucker, cream patch, the shortest greeting in the shop.",
    details: [
      "Black foam front and mesh",
      "Bold block-letter patch",
      "Red underline stitch",
      "Adjustable snapback",
    ],
    colors: [{ name: "Black", hex: "#1c1c1c", images: ["/hats/yall.webp"] }],
  }),
  hat({
    id: "scallop-crochet",
    name: "Scalloped Crochet",
    price: 86,
    category: "raffia",
    featured: true,
    fit: "One size",
    description:
      "An open lattice just above a scalloped brim, with a rounded crown worked in tight rounds. Sage for the garden, ivory for everything else. The brim holds a soft curve instead of a hard saucer.",
    details: [
      "Crochet sun hat",
      "Scalloped brim edge",
      "Openwork band above the brim",
      "Sage or ivory",
    ],
    colors: [
      { name: "Ivory", hex: "#f3efe4", images: ["/hats/scallop-ivory.webp"] },
      { name: "Sage", hex: "#c5c6a4", images: ["/hats/scallop-sage.webp"] },
    ],
  }),
  hat({
    id: "ribbon-sun",
    name: "Ribbon Brim Sun Hat",
    price: 64,
    category: "raffia",
    fit: "One size",
    description:
      "A low crown and a brim built in concentric rows, with a narrow ribbon line near the edge. Light, packable, and made in the colors of a bleached coast — natural, cream, sage, black, powder, and a soft coastal blue.",
    details: [
      "Open-stitch brim",
      "Ribbon detail near the edge",
      "Packable crown",
      "Six colors",
    ],
    colors: [
      { name: "Natural", hex: "#e4d2ae", images: ["/hats/ribbon-natural.webp"] },
      { name: "Cream", hex: "#f4efe4", images: ["/hats/ribbon-cream.webp"] },
      { name: "Sage", hex: "#c9d4c4", images: ["/hats/ribbon-sage.webp"] },
      { name: "Black", hex: "#1c1c1c", images: ["/hats/ribbon-black.webp"] },
      { name: "Powder", hex: "#d5e6ee", images: ["/hats/ribbon-powder.webp"] },
      { name: "Coastal", hex: "#7ea8bc", images: ["/hats/ribbon-coastal.webp"] },
    ],
  }),
  hat({
    id: "bow-cloche",
    name: "Tie-Bow Raffia Cloche",
    price: 72,
    category: "raffia",
    fit: "One size, tie at the side",
    description:
      "Shorter than a sun hat, closer to a cloche. A self-fabric bow ties at the side and the brim turns gently down. Natural, black, blush, and a camel shown on the form.",
    details: [
      "Raffia braid",
      "Side bow you can retie",
      "Shorter downturned brim",
      "Natural, black, blush, or camel",
    ],
    colors: [
      { name: "Natural", hex: "#e6d3b4", images: ["/hats/bow-natural.webp"] },
      { name: "Black", hex: "#222222", images: ["/hats/bow-black.webp"] },
      { name: "Blush", hex: "#f0cbbd", images: ["/hats/bow-blush.webp"] },
      { name: "Camel", hex: "#c4a574", images: ["/hats/bow-camel.webp"] },
    ],
  }),
  hat({
    id: "raffia-boater",
    name: "Wide Brim Raffia Boater",
    price: 94,
    category: "raffia",
    featured: true,
    fit: "One size, with a chin tie",
    description:
      "A flat-top boater in open raffia, with a wide level brim, a wrapped band, and a chin tie that disappears when you do not need it. Natural straw, or a deeper toast.",
    details: [
      "Flat crown",
      "Wide raffia brim",
      "Wrapped band and chin tie",
      "Natural or toast",
    ],
    colors: [
      { name: "Natural", hex: "#e2c89a", images: ["/hats/boater-natural.webp"] },
      { name: "Toast", hex: "#b88858", images: ["/hats/boater-toast.webp"] },
    ],
  }),
  hat({
    id: "raffia-bucket",
    name: "Raffia Bucket",
    price: 58,
    category: "raffia",
    fit: "One size",
    description:
      "A close bucket in natural raffia with a short brim and a pale binding along the edge. The crown shot and the side shot are the same hat — spiral top, sloping brim.",
    details: [
      "Raffia bucket crown",
      "Short brim with a pale binding",
      "Shown from above and in profile",
    ],
    colors: [
      {
        name: "Natural",
        hex: "#d8c09a",
        images: ["/hats/bucket-top.webp", "/hats/bucket-side.webp"],
        views: ["crown", "profile"],
      },
    ],
  }),
  hat({
    id: "canvas-sun",
    name: "Rolled Brim Canvas",
    price: 74,
    category: "canvas",
    featured: true,
    fit: "One size",
    description:
      "Cotton canvas with a deep crown, a self band, and a brim rolled under so the edge stays soft. Ten colors, one shape. A small oval badge sits on the band.",
    details: [
      "Cotton canvas",
      "Deep crown and rolled brim",
      "Self-fabric band",
      "Ten colors",
    ],
    colors: [
      { name: "Coral", hex: "#e06a78", images: ["/hats/canvas-coral.webp"] },
      { name: "Sand", hex: "#d9c7a4", images: ["/hats/canvas-sand.webp"] },
      { name: "Navy", hex: "#243656", images: ["/hats/canvas-navy.webp"] },
      { name: "Black", hex: "#1b1b1b", images: ["/hats/canvas-black.webp"] },
      { name: "Olive", hex: "#6d7050", images: ["/hats/canvas-olive.webp"] },
      { name: "Turquoise", hex: "#1bb5c4", images: ["/hats/canvas-turquoise.webp"] },
      { name: "Sky", hex: "#79b4e4", images: ["/hats/canvas-sky.webp"] },
      { name: "Cloud", hex: "#e4eaf0", images: ["/hats/canvas-cloud.webp"] },
      { name: "Lilac", hex: "#e4c0dc", images: ["/hats/canvas-lilac.webp"] },
      { name: "Red", hex: "#d12f3c", images: ["/hats/canvas-red.webp"] },
    ],
  }),
  hat({
    id: "sun-concho",
    name: "Sun Concho Cowboy",
    price: 108,
    category: "straw",
    fit: "One size, with a chin cord",
    description:
      "Natural open-weave straw, a pinched cowboy crown, and a brown cord held by a silver sun concho. The chin cord ends in a wooden bead so it stays put on a windy boardwalk.",
    details: [
      "Open-weave straw",
      "Pinched crown and wide brim",
      "Brown cord with a sun concho",
      "Chin cord with a bead stop",
    ],
    colors: [{ name: "Natural", hex: "#e2c896", images: ["/hats/cowboy-concho.webp"] }],
  }),
  hat({
    id: "fiesta-floral",
    name: "Fiesta Floral Cowboy",
    price: 124,
    category: "straw",
    featured: true,
    fit: "One size",
    description:
      "The brim is the garden: teal, pink, and gold flowers stitched along both sides, with diamond vents in the crown and a braided brown band. This is the hat the rest of the western shelf is standing next to.",
    details: [
      "Open-weave straw",
      "Floral brim in teal, pink, and gold",
      "Vented crown",
      "Braided band",
    ],
    colors: [{ name: "Natural", hex: "#e0bc7a", images: ["/hats/cowboy-floral.webp"] }],
  }),
  hat({
    id: "turquoise-chip",
    name: "Turquoise Chip Cowboy",
    price: 118,
    category: "straw",
    featured: true,
    fit: "One size",
    description:
      "Pale straw, diamond-shaped vents, and a band of crushed turquoise chips flanking a silver concho. It reads western without shouting.",
    details: [
      "Pale open-weave straw",
      "Vented crown",
      "Turquoise chip band",
      "Silver concho",
    ],
    colors: [{ name: "Natural", hex: "#e6d2a4", images: ["/hats/cowboy-turquoise.webp"] }],
  }),
  hat({
    id: "burnished-turquoise",
    name: "Burnished Turquoise Cowboy",
    price: 112,
    category: "straw",
    fit: "One size",
    description:
      "The brim is burned a deeper gold at the edge. A leather band, braided at the side, holds one round turquoise stone under a patterned vent in the crown.",
    details: [
      "Burnished straw brim",
      "Patterned crown vents",
      "Leather band with a turquoise stone",
      "Braided leather accent",
    ],
    colors: [{ name: "Burnished", hex: "#c4924e", images: ["/hats/cowboy-burnished.webp"] }],
  }),
  hat({
    id: "painted-band",
    name: "Painted Floral Band",
    price: 120,
    category: "straw",
    fit: "One size",
    description:
      "Chocolate straw with a smooth crown and a tooled leather band painted in blue flowers and pale leaves. The darkest western hat in the shop, and the most dressed.",
    details: [
      "Chocolate woven straw",
      "Shaped cowboy crown",
      "Painted leather band",
      "Blue floral tooling",
    ],
    colors: [{ name: "Chocolate", hex: "#6a432c", images: ["/hats/cowboy-painted.webp"] }],
  }),
  hat({
    id: "turquoise-studs",
    name: "Turquoise Stud Cowboy",
    price: 116,
    category: "straw",
    fit: "One size",
    description:
      "A natural crown, a brim scorched darker at the roll, and a leather band set with a row of small turquoise stones. Vents run across the front of the crown.",
    details: [
      "Two-tone burned brim",
      "Vented crown",
      "Leather band",
      "Row of turquoise studs",
    ],
    colors: [{ name: "Natural", hex: "#e4c48a", images: ["/hats/cowboy-studded.webp"] }],
  }),
  hat({
    id: "open-weave-cowboy",
    name: "Open-Weave Raffia Cowboy",
    price: 82,
    category: "straw",
    fit: "One size",
    description:
      "The plain one, in the best way. A raffia cowboy with a self-band, a cattleman crease, and no extra hardware. It packs flatter than the straw concho hats and still reads western.",
    details: [
      "Raffia cowboy crown",
      "Self-fabric band",
      "Upturned brim",
      "No extra ornament",
    ],
    colors: [{ name: "Natural", hex: "#d7c09a", images: ["/hats/raffia-cowboy.webp"] }],
  }),
];

export function money(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function shippingFor(subtotal) {
  if (subtotal <= 0) return 0;
  return SHIPPING_RATE;
}

export function collectionById(id) {
  if (id === "stock") return stockShelf;
  return collections.find((c) => c.id === id) || null;
}

export function productsIn(collectionId) {
  if (!collectionId || collectionId === "all") return products;
  if (collectionId === "stock") return products.filter((p) => p.inStock);
  if (collectionId === "sun") {
    return products.filter((p) => p.category === "raffia" || p.category === "canvas");
  }
  return products.filter((p) => p.category === collectionId);
}

export function findProduct(id) {
  return products.find((p) => p.id === id) || null;
}

export function relatedTo(product, n = 4) {
  const same = products.filter((p) => p.category === product.category && p.id !== product.id);
  const rest = products.filter((p) => p.category !== product.category);
  return [...same, ...rest].slice(0, n);
}

export function categoryLabel(id) {
  return collectionById(id)?.name || "Hats";
}

export function pictureOf(color, index = 0) {
  return color.images[index] || color.images[0];
}
