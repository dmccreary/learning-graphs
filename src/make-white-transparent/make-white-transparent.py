from PIL import Image
import sys
import os

def make_white_transparent(image_path, output_path, tolerance=0):
    """
    Makes the white background of an image transparent.

    Parameters:
    - image_path: Path to the input image.
    - output_path: Path to save the output image.
    - tolerance: Tolerance level for white color (default is 0 for pure white).
    """
    img = Image.open(image_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # Check if the pixel is close to white
        if all(channel >= 255 - tolerance for channel in item[:3]):
            # Replace white or near-white pixel with a transparent pixel
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Saved the transparent image as {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python script.py input_image")
        sys.exit(1)

    input_image = sys.argv[1]
    base_name = os.path.basename(input_image)
    name, ext = os.path.splitext(base_name)
    output_image = f"transparent_{name}.png"

    make_white_transparent(input_image, output_image, tolerance=10)
