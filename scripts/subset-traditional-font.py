"""Build the website's WenKai TC subset from the official regular TTF."""

import argparse
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont


parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("source", type=Path, help="Official LXGWWenKaiTC-Regular.ttf")
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
text = "".join(
    path.read_text()
    for path in (root / "src").rglob("*")
    if path.suffix in {".ts", ".tsx"}
)
codepoints = set(map(ord, text)) | set(range(32, 127))
font = TTFont(args.source)
options = subset.Options()
options.name_IDs = ["*"]
options.name_languages = ["*"]
subsetter = subset.Subsetter(options=options)
subsetter.populate(unicodes=codepoints)
subsetter.subset(font)
# Follow upstream's request to avoid its brand names for derived fonts.
names = {
    1: "PlayStats TC",
    3: "PlayStats TC Regular website subset",
    4: "PlayStats TC Regular",
    6: "PlayStatsTC-Regular",
    16: "PlayStats TC",
}
for record in font["name"].names:
    if record.nameID in names:
        record.string = names[record.nameID].encode(record.getEncoding())
font.flavor = "woff2"
output = root / "public/fonts/PlayStatsTC-Regular.woff2"
font.save(output)
print(f"Created {output.name}: {output.stat().st_size:,} bytes")
