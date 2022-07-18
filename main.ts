function startGame () {
    music.setBuiltInSpeakerEnabled(true)
    snekDirection = 90
    snekXPos = [-1]
    snekYPos = [0]
    led.plot(snekXPos[0], snekYPos[0])
    snekLength = 1
    appleY = randint(1, 4)
    appleX = randint(1, 4)
    led.plotBrightness(appleX, appleY, 128)
}
input.onButtonPressed(Button.A, function () {
    snekDirection += -90
    if (snekDirection < 0) {
        snekDirection += 360
    }
})
function drawSnek (newApplePos: boolean) {
    basic.clearScreen()
    led.plotBrightness(appleX, appleY, 128)
    led.plotBrightness(snekXPos[0], snekYPos[0], 255)
    for (let index = 0; index <= snekLength - 2; index++) {
        led.plotBrightness(snekXPos[index + 1], snekYPos[index + 1], 56)
    }
    if (newApplePos) {
        music.playSoundEffect(music.createSoundEffect(WaveShape.Triangle, 374, 1578, 255, 220, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.InBackground)
    } else {
        music.playSoundEffect(music.createSoundEffect(WaveShape.Sawtooth, 1600, 1, 255, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Curve), SoundExpressionPlayMode.InBackground)
    }
}
function contains (a: any[], obj: number) {
    for (let i = 0; i <= a.length - 1; i++) {
        if (a[i] == obj) {
            return true
        }
    }
    return false
}
input.onButtonPressed(Button.B, function () {
    snekDirection += 90
    if (snekDirection > 360) {
        snekDirection += -360
    }
})
let newAppPos = false
let snekLength = 0
let snekDirection = 0
let snekXPos: number[] = []
let snekYPos: number[] = []
let appleY = 0
let appleX = 0
startGame()
basic.forever(function () {
    if (snekDirection == 90) {
        snekXPos.unshift(Math.constrain(snekXPos[0] + 1, 0, 4))
        snekYPos.unshift(snekYPos[0])
    } else if (snekDirection == 180) {
        snekYPos.unshift(Math.constrain(snekYPos[0] + 1, 0, 4))
        snekXPos.unshift(snekXPos[0])
    } else if (snekDirection == 270) {
        snekXPos.unshift(Math.constrain(snekXPos[0] - 1, 0, 4))
        snekYPos.unshift(snekYPos[0])
    } else {
        snekYPos.unshift(Math.constrain(snekYPos[0] - 1, 0, 4))
        snekXPos.unshift(snekXPos[0])
    }
    if (snekXPos[0] == appleX && snekYPos[0] == appleY) {
        snekLength += 1
        do{
         appleY = randint(0, 4)
         appleX = randint(0, 4)
        }while(!contains(snekXPos,appleX)&&!contains(snekYPos,appleY));
newAppPos = true
    } else {
        newAppPos = false
        snekXPos.pop()
        snekYPos.pop()
    }
    if (snekLength > 24) {
        basic.clearScreen()
        music.playSoundEffect(music.builtinSoundEffect(soundExpression.twinkle), SoundExpressionPlayMode.InBackground)
        while (!(input.buttonIsPressed(Button.AB))) {
            basic.showString("You Win!")
        }
        startGame()
    } else {
        drawSnek(newAppPos)
        if (contains(snekXPos.slice(1), snekXPos[0]) && contains(snekYPos.slice(1), snekYPos[0])) {
            basic.clearScreen()
            music.playSoundEffect(music.createSoundEffect(WaveShape.Sawtooth, 4610, 1, 255, 255, 1000, SoundExpressionEffect.Vibrato, InterpolationCurve.Logarithmic), SoundExpressionPlayMode.InBackground)
            while (!(input.buttonIsPressed(Button.AB))) {
                basic.showIcon(IconNames.Skull)
            }
            startGame()
        } else {
            basic.pause(1000)
        }
    }
})
