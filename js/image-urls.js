// NASA-hosted image URLs for all 16 ECHOES mission records + planet/hero assets.
// These are real mission photographs / mosaics, NOT AI-generated illustrations.
// Attribute NASA and the specific image source; do not imply NASA endorses ECHOES.
// For offline support, download the photos to assets/images/ and replace URLs with local paths.
window.ECHOES_REAL_IMAGES = {
  "ingenuity": "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia24/pia24541/PIA24541.jpg",
  "opportunity": "https://assets.science.nasa.gov/content/dam/science/psd/mars/downloadable_items/3/7/37740_pia18079-sols3611-3613-vert-L456-ATC_cr.jpg",
  "spirit": "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/mars/downloadable_items/3/37432_Sol650circa_SummitPolarV9-PIA03275.jpg",
  "sojourner": "https://d2pn8kiwq2w21t.cloudfront.net/original_images/jpegPIA04318.jpg",
  "viking1": "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/mars/downloadable_items/3/4/34282_Mars-Viking1-Lander-Color-Image-PIA00563.jpg",
  "viking2": "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/mars/downloadable_items/3/8/38727_Mars-Viking-Lander-American-Flag.jpg",
  "phoenix": "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/mars/downloadable_items/3/5/35317_phx20110310b_PIA13804_phoenix_msp_deck.jpg",
  "insight": "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar/2023/09/p/i/a/PIA22876.png",
  "pathfinder": "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/mars/downloadable_items/3/9/39895_PIA00903.jpg",
  "eagle": "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/lunar-science/2023/09/as11-40-5927_orig.jpg",
  "surveyor3": "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar/2023/09/a/as12-48-7134.jpg",
  "rover15": "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/lunar-science/2023/08/apollo15_rover_1200.jpg",
  "rover16": "https://images-assets.nasa.gov/image/S72-37002/S72-37002~large.jpg",
  "rover17": "https://eol.jsc.nasa.gov/DatabaseImages/ISD/lowres/AS17/AS17-134-20476.JPG",
  "alsep12": "https://nssdc.gsfc.nasa.gov/imgcat/higher_res/apollo/as12_47_6921.jpg",
  "reflector11": "https://eol.jsc.nasa.gov/DatabaseImages/ISD/lowres/AS11/AS11-40-5948.JPG"
};

window.ECHOES_EXTRA_IMAGES = {
  "planet-mars": "https://d2pn8kiwq2w21t.cloudfront.net/original_images/jpegPIA00407.jpg",
  "planet-moon": "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/lunar-science/2023/08/lro_fullmoon.jpg",
  "hero-mars": "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/mars/downloadable_items/4/5/45123_PIA23971-spaghetti_western_butte_pediment.jpg?fit=clip&w=2200",
  "hero-moon": "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/lunar-science/2023/08/apollo15_rover_1200.jpg"
};

// For a minimally invasive integration: include this script after data.js and before app.js.
if (Array.isArray(window.ECHOES_DATA)) {
  for (const mission of window.ECHOES_DATA) {
    if (window.ECHOES_REAL_IMAGES[mission.id]) {
      mission.illustration = window.ECHOES_REAL_IMAGES[mission.id];
    }
  }
}
