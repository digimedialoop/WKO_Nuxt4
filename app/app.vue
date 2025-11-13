<template>
  <div>
    <header><h1>wilde Kreativ Oase</h1></header>
    <main>
      <section>
        <div class="contentCard bgRose flex">
          <div class="imageBox"></div>
          <div class="textBox">
            <h2>Kontakt / Impressum</h2>
            <div class="addressBox">
              <h3>Nadine Mattern</h3>
              <p style="color: white">
                Wegbegleiterin, Wildnispädagogin, <br />Grafik & Mode Designerin
              </p>
              <h4>Terminanfragen</h4>
              <p style="font-size: 120%">info@wildekreativoase.de</p>
              <p style="font-size: 120%">+49 (0) 176 800 42 34 6</p>
              <h4>Locations</h4>
              <h5>Kreativ Garten</h5>
              <p>Brünnerlweg 1b 82211 Herrsching am Ammersee</p>
              <h5>Atelier</h5>
              <p>Heßstraße 65 80798 München | Maxvorstadt</p>
            </div>
          </div>
        </div>
      </section>

      <ClientOnly>
        <section v-if="kinderZeit.length > 0 || frauenZeit.length > 0">
          <div class="contentCard bgStone dates">
            <h2>Termine</h2>
            <div class="textBox">
              <!-- Kinder Zeit -->
              <template v-if="kinderZeit.length > 0">
                <h3>Kinder Zeit</h3>
                <div class="dateBox">
                  <div v-for="kurs in kinderZeit" :key="kurs.id">
                    <h4>{{ kurs.title }}</h4>
                    <p v-html="formatRichText(kurs.description)"></p>
                    <p v-if="kurs.start"><b>Start</b> {{ formatToGermanDate(kurs.start) }} ({{ kurs.termCount }} Termine)</p>
                    <p>Energieausgleich {{ kurs.cost }}</p>
                  </div>
                </div>
              </template>

              <!-- Frauen Zeit -->
              <template v-if="frauenZeit.length > 0">
                <h3>Frauen Zeit</h3>
                <div class="dateBox blueFont">
                  <div v-for="kurs in frauenZeit" :key="kurs.id">
                    <h4>{{ kurs.title }}</h4>
                    <p v-html="formatRichText(kurs.description)"></p>
                    <p v-if="kurs.start"><b>Start</b> {{ kurs.start }} ({{ kurs.termCount }} Termine)</p>
                    <p>Energieausgleich {{ kurs.cost }}</p>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </section>
      </ClientOnly>

    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatRichText } from '@/utils/formatters'

interface Kurs {
  id: number
  title: string
  description: string | null
  start: string | null
  termCount: string | null
  cost: string
  area: string
  active: boolean
}

// Daten abrufen
const { data: kurse } = await useFetch('/api/kurse')

// Nur aktive Kurse
const aktiveKurse = computed(() => (kurse.value || []).filter(k => k.active))

// Filter nach Bereichen
const kinderZeit = computed(() => aktiveKurse.value.filter(k => k.area === 'Kinder Zeit'))
const frauenZeit = computed(() => aktiveKurse.value.filter(k => k.area === 'Frauen Zeit'))
</script>


<style lang="sass">
$colorRose: #F0836B
$colorGold: #D2A31F
$colorGreen: #A5BD66
$colorStone: #DFD2C0
$colorBlue: #7AACAE

$breakpoint-sm: 576px
$breakpoint-md: 768px
$breakpoint-lg: 992px
$breakpoint-xl: 1200px
$breakpoint-xxl: 1400px

@font-face
  font-family: 'headlineFont'
  src: url('/fonts/RightBeginning-PersonalUse.otf') format('opentype')
  font-weight: normal
  font-style: normal

@font-face
  font-family: 'mainFont'
  src: url('/fonts/AvenirNextLTPro-Regular.otf') format('opentype')
  font-weight: normal
  font-style: normal

*,
*::before,
*::after
  box-sizing: border-box

#__nuxt
  width: 100%
  min-height: 100vh
  margin: 0
  font-family: 'mainFont', sans-serif

body, html
  height: 100%
  margin: 0


body
  background-image: url('/images/BGImage.jpg')
  background-attachment: fixed
  background-size: cover
  background-position: center center
  background-repeat: no-repeat
  overflow-y: hidden

header
  width: 100%
  color: white
  text-align: right
  padding: 2rem 10% .5rem 10%
  font-family: 'headlineFont', sans-serif
  background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)

  h1
    font-size: clamp(1.5rem, 1rem + 5vw, 3.8rem)
    margin: 0

main
  max-height: 100vh
  overflow-y: auto
  padding: 1rem auto
  margin: 1rem auto 5rem auto


  .contentCard
    width: 80%
    margin: 0rem 10% 2rem
    padding-bottom: 8rem

    
    .dateBox
      display: grid
      grid-template-columns: repeat(2, 1fr)  // 2 Spalten
      gap: 1rem
      align-items: start 

      div
        display: flex
        flex-direction: column
        

    h2
      padding: 1rem 5vw 0
    
    &.flex
      display: flex
      align-items: flex-start

    &.bgRose
      background-color: rgba($colorRose, 0.85)

    &.bgStone
      background-color: rgba($colorStone, 0.85)

    .textBox
      width: 75%
      height: 100%
      flex: 2
      padding: 1rem 10%
      @media (max-width: $breakpoint-md)
        width: 100%

    &.dates
      h2
        font-size: 3rem
      h3
        font-family: 'headlineFont', sans-serif
        font-size: 2.2rem
        margin-top: 2rem
      h4
        color: darken(#6B8E67, 10%)
        font-size: 1.1rem
        font-weight: bold
        margin-bottom: 1rem
      .blueFont
        h4
          color: darken($colorBlue, 10%)
      p
        font-size: 1rem
        margin: .4rem 0
      .textBox
        width: 100%
        flex: 1

    .imageBox
      background-image: url('/images/RosesImage.jpg')
      background-size: auto 120%
      background-position: right center
      width: 25%
      height: 34rem
      margin: 0
      flex: 1
      @media (max-width: $breakpoint-md)
        display: none

    .addressBox
      margin: 2rem 0 0 10%
      @media (max-width: $breakpoint-md)
        margin-left: 3%

  h2
    font-family: 'headlineFont', sans-serif
    color: white
    font-size: 3rem

  h3
    color: white
    font-size: 1.4rem

  h4
    font-size: .95rem
    font-weight: bold
    font-style: italic
    margin: 1.8rem 0 .5rem 0

  h5
    font-size: .9rem
    font-weight: bold
    margin: 1rem 0 .5rem

  p
    font-size: 1rem
    line-height: 1.3rem
</style>