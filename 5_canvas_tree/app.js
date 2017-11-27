function getContext() {
    return document.getElementById('canvas')
        .getContext('2d');
}

function lagransianInterpolation(x, inputValues) {
    let k = inputValues.length
    const _basis = (j) => {
        let result = 1
        for (let m = 0; m < k; ++m) {
            if (m != j)
                result *= (x - inputValues[m][0]) / (inputValues[j][0] - inputValues[m][0])
        }
        return result
    }
    if (!inputValues.length) 
        return undefined 
    let result = 0
    for (let i = 0; i < k; ++i)
        result += _basis(i) * inputValues[i][1]
    return result
}

function drawLine(ctx, point1, point2) {
    ctx.moveTo(point1[0] + 12, point1[1])
    ctx.lineTo(point2[0] + 12, point2[1])
}

function drawArrowAt(ctx, point, direction) {
    let left, right
    const modificator = 10
    switch (direction) {
        case 'left': 
            left = [point[0] + modificator, point[1] - modificator / 2]
            right = [point[0] + modificator, point[1] + modificator / 2]
            break
        case 'right':
            left = [point[0] - modificator, point[1] - modificator / 2]
            right = [point[0] - modificator, point[1] + modificator / 2]
            break
        case 'up':
            left = [point[0] - modificator / 2, point[1] + modificator]
            right = [point[0] + modificator / 2, point[1] + modificator]
            break
        case 'down':
            left = [point[0] - modificator / 2, point[1] - modificator]
            right = [point[0] + modificator / 2, point[1] - modificator]
            break
        default:
            left = [point[0] + modificator, point[1] - modificator / 2]
            right = [point[0] + modificator, point[1] + modificator / 2]
    }
    drawLine(ctx, point, left)
    drawLine(ctx, point, right)
}

function drawAxises(ctx, height, width, tickStep) {
    const _drawPrimaryLines = () => {
        drawLine(ctx, [0, 0], [0, height])
        drawLine(ctx, [0, height], [width, height])
    }
    const _drawVerticalTicks = () => {
        for (let i = 0; i < height; i += tickStep) 
            drawLine(ctx, [0, height - i], [4, height - i])
    }
    const _drawHorizontalTicks = () => {
        for (let i = 20; i < width; i += tickStep)
            drawLine(ctx, [width - i, height], [width - i, height - 4])
    }
    _drawPrimaryLines(), _drawVerticalTicks(), _drawHorizontalTicks()
    drawArrowAt(ctx, [width, height], 'right'), drawArrowAt(ctx, [0, 0], 'up')
}

const updateView = (ctx) => ctx.stroke()

function drawTree(ctx, point, len) {
    if (len < .2) 
        return

    const lineLeft = [point[0] + len, point[1] - len],
          lineCenter = [point[0], point[1] - len],
          lineRight = [point[0] - len, point[1] - len]
    drawLine(ctx, point, lineLeft)
    drawLine(ctx, point, lineCenter)
    drawLine(ctx, point, lineRight)

    drawTree(ctx, lineLeft, len / 1.6)
    drawTree(ctx, lineCenter, len / 1.7)
    drawTree(ctx, lineRight, len / 1.6)
}

document.addEventListener('DOMContentLoaded', function() {
    let ctx = getContext(),
        height = 500,
        width = 1000,
        tickStep = 20
    drawAxises(ctx, height, width, tickStep)
    drawTree(ctx, [width / 2, height], 180)
    updateView(ctx)
})
