from pathlib import Path
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "assets" / "og-default.png"

PAPER = "#f3f0e8"
INK = "#15222b"
NAVY = "#173746"
RUST = "#bd4e31"
LINE = "#d6d0c3"
MUTED = "#6c777b"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


canvas = Image.new("RGB", (1200, 630), PAPER)
draw = ImageDraw.Draw(canvas)

for x in range(0, 1200, 80):
    draw.line((x, 0, x, 630), fill="#e9e5db", width=1)
for y in range(0, 630, 80):
    draw.line((0, y, 1200, y), fill="#e9e5db", width=1)

sans = r"C:\Windows\Fonts\msyh.ttc"
sans_bold = r"C:\Windows\Fonts\msyhbd.ttc"
serif = r"C:\Windows\Fonts\simsun.ttc"
mono = r"C:\Windows\Fonts\consola.ttf"

draw.rectangle((64, 62, 110, 108), fill=INK)
draw.text((76, 69), "吴", font=font(serif, 30), fill=PAPER)
draw.text((127, 69), "WU SHUAI", font=font(mono, 16), fill=INK)
draw.text((127, 92), "FIELD NOTES", font=font(mono, 13), fill=MUTED)

draw.text((64, 190), "写具体的，", font=font(serif, 63), fill=INK)
draw.text((64, 272), "不写正确的。", font=font(serif, 73), fill=RUST)

draw.line((64, 385, 1136, 385), fill=LINE, width=2)
draw.text(
    (64, 418),
    "教学现场 / 推荐系统 / 系统项目 / 职业选择",
    font=font(sans, 25),
    fill=INK,
)
draw.text(
    (64, 466),
    "安徽信息工程学院 · 模式识别与智能系统",
    font=font(sans, 18),
    fill=MUTED,
)

draw.rectangle((64, 548, 72, 578), fill=RUST)
draw.text(
    (88, 548),
    "wudgsfd.github.io/wushuai.github.io",
    font=font(mono, 16),
    fill=NAVY,
)

OUT.parent.mkdir(parents=True, exist_ok=True)
canvas.save(OUT, optimize=True)
print(OUT)
