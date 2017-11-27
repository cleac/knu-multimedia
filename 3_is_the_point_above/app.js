function getContext() {
    return document.getElementById('canvas')
        .getContext('2d');
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
    ctx.stroke()
}

function drawPoint(ctx, point, color) {
    ctx.beginPath()
    ctx.strokeStyle = color || 'blue'
    drawArrowAt(ctx, point, 'right')
    drawArrowAt(ctx, point, 'left')
    drawArrowAt(ctx, point, 'down')
    drawArrowAt(ctx, point, 'up')
    ctx.stroke()
}

let convertCoordinates = (width, height) => (x, y) => [x, height - y]

document.addEventListener('DOMContentLoaded', function() {
    let ctx = getContext(),
        height = 500,
        width = 1000,
        tickStep = 10,
        point = [0, 10]
    const _function = (x) => x + 10
    convertCoordinates = convertCoordinates(width, height)
    const draw = () => {
        ctx.clearRect(0, 0, width, height)
        ctx.strokeStyle = 'black'
        drawAxises(ctx, height, width, tickStep)
        drawPoint(ctx, convertCoordinates(point[0], point[1]), _function(point[0]) > point[1] ? 'red' : 'blue')
        ctx.stroke()
        ctx.beginPath()
        drawLine(
            ctx,
            convertCoordinates(0, _function(0)),
            convertCoordinates(width, _function(width)))
        ctx.stroke()
    }

    draw()
    document.getElementById('canvas').addEventListener('click', (event) => {
        point = [event.clientX - 16, height - event.clientY + 4]
        draw()
    })
})
