// ============================================
// USE BUILT-IN FAO BOUNDARIES - NO UPLOAD NEEDED
// ============================================

// GEE has India boundaries built-in — use Level 2 (Districts)
var india_districts = ee.FeatureCollection("FAO/GAUL/2015/level2")
  .filter(ee.Filter.eq('ADM0_NAME', 'India'));

print("District count:", india_districts.size());
Map.centerObject(india_districts, 5);
Map.addLayer(india_districts, {color: 'blue'}, 'India Districts');

// ============================================
// NIGHTTIME LIGHTS CHANGE
// ============================================
var ntl_2019 = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG")
  .filterDate('2019-01-01', '2019-12-31')
  .select('avg_rad')
  .mean();

var ntl_2024 = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG")
  .filterDate('2024-01-01', '2024-12-31')
  .select('avg_rad')
  .mean();

var ntl_change = ntl_2024.subtract(ntl_2019).rename('ntl_change');

// ============================================
// NDVI CHANGE
// ============================================
var ndvi_2019 = ee.ImageCollection("MODIS/061/MOD13A3")
  .filterDate('2019-01-01', '2019-12-31')
  .select('NDVI')
  .mean();

var ndvi_2024 = ee.ImageCollection("MODIS/061/MOD13A3")
  .filterDate('2024-01-01', '2024-12-31')
  .select('NDVI')
  .mean();
// Add this line and click Run again to zoom to India
Map.setCenter(78.9629, 20.5937, 5);
var ndvi_change = ndvi_2024.subtract(ndvi_2019).rename('ndvi_change');

// ============================================
// BUILT-UP CHANGE
// ============================================
var builtup_change = ee.Image("JRC/GHSL/P2023A/GHS_BUILT_S/2025")
  .subtract(ee.Image("JRC/GHSL/P2023A/GHS_BUILT_S/2020"))
  .select('built_surface')
  .rename('builtup_change');

// ============================================
// EXTRACT PER DISTRICT
// ============================================
var combined = ntl_change.addBands(ndvi_change).addBands(builtup_change);

var stats = combined.reduceRegions({
  collection: india_districts,
  reducer: ee.Reducer.mean(),
  scale: 1000,   // increased to avoid memory error
  tileScale: 8   // increased to avoid memory error
});

// ============================================
// VISUALIZE
// ============================================
Map.addLayer(ntl_change,
  {min: -1, max: 5, palette: ['black','purple','orange','yellow']},
  'NTL Change 2019-2024');

// ============================================
// EXPORT
// ============================================
Export.table.toDrive({
  collection: stats,
  description: 'india_district_growth',
  folder: 'GEE_Project',
  fileFormat: 'CSV'
});

print("✅ Click TASKS tab → RUN to export!");
