# village-economic-growth
# Village Economic Growth Intelligence
Finding the Top 100 fastest growing districts in India using satellite data.

## Project Overview
Economic growth at the village/district level in India is largely invisible 
in traditional data sources. This project uses satellite imagery to identify 
the top 100 economically growing districts over the last 5 years (2019–2024).

## Data Sources
| Dataset | Source | Why Used |
|---------|--------|----------|
| Nighttime Lights (VIIRS) | NOAA via Google Earth Engine | Measures electrification and economic activity |
| NDVI (Vegetation Index) | MODIS via Google Earth Engine | Measures agricultural productivity |
| Built-up Area | JRC GHSL via Google Earth Engine | Measures construction and urbanization |
| District Boundaries | FAO GAUL 2015 via Google Earth Engine | Base geographic unit |

## Methodology
### Scoring Formula
Growth Score = (NTL Change × 0.50) + (NDVI Change × 0.25) + (Builtup Change × 0.25)
### Pipeline
Satellite Data (GEE) → Extract per District → Export CSV → Normalize → Score → Rank → Top 100

### Why These Weights?
- **Nighttime Lights (50%)** — Strongest proxy for economic activity
- **NDVI (25%)** — Agriculture is primary livelihood in rural India
- **Built-up Area (25%)** — Construction indicates investment and growth

## How to Run

### Step 1 — Google Earth Engine
1. Open Google Earth Engine at code.earthengine.google.com
2. Copy and paste the script from `gee_script.js`
3. Click Run
4. Go to Tasks tab and click RUN to export CSV to Google Drive

### Step 2 — Google Colab
1. Open `scoring.ipynb` in Google Colab
2. Run all cells in order
3. Output files will be saved to Google Drive

## Output Files
| File | Description |
|------|-------------|
| `india_district_growth.csv` | Raw extracted values per district |
| `top100_districts.csv` | Final ranked Top 100 districts |
| `top20_chart.png` | Bar chart of top 20 districts |
| `top100_map.html` | Interactive map of results |

## Key Findings
-Tamil Nadu leads with 26 districts in the top 100
-Southern and Western India show strongest growth
-Maharashtra and Karnataka follow as growth hubs
-Bihar and Jharkhand surprisingly appear — indicating rapid catch-up growth in traditionally lagging states

## Limitations
- District level analysis used instead of village level due to data availability
- Satellite signals are proxies, not direct measures of economic growth
- MODIS NDVI resolution is 1km — may miss small village-level changes
- Cloud cover can affect satellite readings in some regions
- District level used instead of village level
-Tamil Nadu's dominance may reflect its denser district boundaries (more districts = more chances to rank)
-Proxy signals ≠ actual GDP

## Next Steps
Next Steps (if more time/data available):
-Get actual village-level boundaries (600,000 villages)
-Add road network growth as additional signal
-Add hospital/school density changes
-Validate with PMGSY, MNREGA ground truth data
-Use ML model instead of weighted scoring
-Build real-time dashboard with live satellite feeds
## Tools Used
- Google Earth Engine (satellite data processing)
- Python / Google Colab (scoring and visualization)
- Libraries: pandas, sklearn, matplotlib, folium

## Author
Pallavi Bange
pallavibange1976@gmail.com
