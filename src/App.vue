<template>
  <main id="app" :style="containerStyles">
    <a :href="rootUrl" class="logo">
      <span class="hidden">ColorMeHex</span>
    </a>
    <form @submit.prevent>
      <label
        v-if="birthday"
        data-testid="birthday"
        for="name"
        @click="launchConfetti"
        >🎉 Happy birthday... 🎉</label
      >
      <label v-else for="name">Type something and press Enter</label>
      <input
        id="name"
        ref="input"
        v-model="name"
        type="search"
        :disabled="birthday"
        data-testid="input"
      />

      <transition name="show" appear>
        <div v-if="name" v-show="hexName" class="results">
          <div class="colorCopy">
            <label for="hexColor">Copy color</label>
            <output id="hexColor" data-testid="hexname" @click="copyHex">{{
              hexName
            }}</output>
          </div>
          <div class="actions">
            <a v-if="birthday" :href="rootUrl" title="Clear">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M18 7v13c0 0.276-0.111 0.525-0.293 0.707s-0.431 0.293-0.707 0.293h-10c-0.276 0-0.525-0.111-0.707-0.293s-0.293-0.431-0.293-0.707v-13zM17 5v-1c0-0.828-0.337-1.58-0.879-2.121s-1.293-0.879-2.121-0.879h-4c-0.828 0-1.58 0.337-2.121 0.879s-0.879 1.293-0.879 2.121v1h-4c-0.552 0-1 0.448-1 1s0.448 1 1 1h1v13c0 0.828 0.337 1.58 0.879 2.121s1.293 0.879 2.121 0.879h10c0.828 0 1.58-0.337 2.121-0.879s0.879-1.293 0.879-2.121v-13h1c0.552 0 1-0.448 1-1s-0.448-1-1-1zM9 5v-1c0-0.276 0.111-0.525 0.293-0.707s0.431-0.293 0.707-0.293h4c0.276 0 0.525 0.111 0.707 0.293s0.293 0.431 0.293 0.707v1z"
                ></path>
              </svg>
            </a>
            <a v-else :href="shareLink + '&birthday'" title="Birthday mode">
              <svg
                id="icon-birthday-cake"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M24 18.857v5.143h-24v-5.143c1.313 0 2.009-0.589 2.558-1.058 0.455-0.402 0.763-0.656 1.446-0.656s0.978 0.254 1.446 0.656c0.549 0.469 1.232 1.058 2.558 1.058 1.313 0 1.996-0.589 2.558-1.058 0.455-0.402 0.75-0.656 1.433-0.656s0.991 0.254 1.446 0.656c0.549 0.469 1.246 1.058 2.558 1.058s2.009-0.589 2.558-1.058c0.455-0.402 0.763-0.656 1.446-0.656 0.67 0 0.978 0.254 1.433 0.656 0.549 0.469 1.246 1.058 2.558 1.058zM24 14.571v2.571c-0.683 0-0.978-0.254-1.446-0.656-0.549-0.469-1.232-1.058-2.545-1.058-1.326 0-2.009 0.589-2.558 1.058-0.469 0.402-0.763 0.656-1.446 0.656s-0.991-0.254-1.446-0.656c-0.549-0.469-1.232-1.058-2.558-1.058-1.313 0-1.996 0.589-2.558 1.058-0.455 0.402-0.75 0.656-1.433 0.656s-0.991-0.254-1.446-0.656c-0.549-0.469-1.246-1.058-2.558-1.058-1.326 0-2.009 0.589-2.558 1.058-0.455 0.402-0.763 0.656-1.446 0.656v-2.571c0-1.42 1.152-2.571 2.571-2.571h0.857v-6h3.429v6h3.429v-6h3.429v6h3.429v-6h3.429v6h0.857c1.42 0 2.571 1.152 2.571 2.571zM6.857 3c0 1.42-0.763 2.143-1.714 2.143s-1.714-0.763-1.714-1.714c0-1.661 1.714-1.232 1.714-3.429 0.643 0 1.714 1.58 1.714 3zM13.714 3c0 1.42-0.763 2.143-1.714 2.143s-1.714-0.763-1.714-1.714c0-1.661 1.714-1.232 1.714-3.429 0.643 0 1.714 1.58 1.714 3zM20.571 3c0 1.42-0.763 2.143-1.714 2.143s-1.714-0.763-1.714-1.714c0-1.661 1.714-1.232 1.714-3.429 0.643 0 1.714 1.58 1.714 3z"
                ></path>
              </svg>
            </a>
            <a
              :href="birthday ? shareLink + '&birthday' : shareLink"
              title="Share"
              @click.prevent="shareColor"
            >
              <svg id="icon-share" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M18 16.078q1.219 0 2.063 0.867t0.844 2.039q0 1.219-0.867 2.086t-2.039 0.867-2.039-0.867-0.867-2.086q0-0.469 0.047-0.656l-7.078-4.125q-0.891 0.797-2.063 0.797-1.219 0-2.109-0.891t-0.891-2.109 0.891-2.109 2.109-0.891q1.172 0 2.063 0.797l7.031-4.078q-0.094-0.469-0.094-0.703 0-1.219 0.891-2.109t2.109-0.891 2.109 0.891 0.891 2.109-0.891 2.109-2.109 0.891q-1.125 0-2.063-0.844l-7.031 4.125q0.094 0.469 0.094 0.703t-0.094 0.703l7.125 4.125q0.844-0.75 1.969-0.75z"
                />
              </svg>
            </a>
          </div>
        </div>
      </transition>
      <transition name="show">
        <p v-if="message" data-testid="message" class="notification">
          <strong>{{ message }}</strong>
        </p>
      </transition>
    </form>

    <footer>
      <p>
        Made by
        <a href="https://talentedunicorn.com" @click="trackLink"
          >Talentedunicorn</a
        >
      </p>
      <p>
        <a class="twitter" :href="twitterLink" @click="trackLink"
          >Share on Twitter</a
        >
      </p>
    </footer>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useHead } from "@unhead/vue";
import invert from "invert-color";
import confetti from "canvas-confetti";

const messageTimeout = 3000;
const rootUrl = window.location.origin;

const name = ref("");
const message = ref("");
const birthday = ref(false);
const input = ref();

const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};
const intToRGB = (i) => {
  let c = (i & 0x00ffffff).toString(16).toUpperCase();
  return "00000".substring(0, 6 - c.length) + c;
};

const hexName = computed({
  get: () => {
    let text = name.value.trim().toLowerCase();
    text = hashCode(text);
    text = intToRGB(text);
    return `#${text}`;
  },
});

const invertedHex = computed({
  get: () => invert(hexName.value, true),
});

const twitterLink = () => {
  const description = "A fun toy that changes your text to colors";
  return `https://www.twitter.com/intent/tweet?url=${rootUrl}&text=${description}`;
};

const shareLink = computed({
  get: () => `${rootUrl}?text=${encodeURIComponent(name.value)}`,
});

const containerStyles = computed({
  get: () => ({
    "--background": hexName.value,
    "--color": invertedHex.value,
  }),
});

const copyHex = () => {
  navigator.clipboard.writeText(hexName.value).then(() => {
    message.value = "Copied to clipboard!";
    setTimeout(() => {
      clear();
    }, messageTimeout);
  });
};

const clear = () => (message.value = "");

const shareColor = () => {
  const url = birthday.value ? `${shareLink.value}&birthday` : shareLink.value;
  const text = birthday.value
    ? `Happy birthday, ${name.value}!`
    : `ColorMeHex - ${name.value}`;
  if (navigator.share) {
    navigator.share({
      title: name.value,
      text,
      url,
    });
  } else {
    // Copy link to clipboard
    navigator.clipboard.writeText(url).then(() => {
      message.value = "Link copied to clipboard!";
      setTimeout(() => {
        clear();
      }, messageTimeout);
    });
  }
};

const trackLink = (e) => {
  window.gtag &&
    window.gtag("event", e.type, {
      event_category: "outbound link",
      event_label: e.target.href,
    });
};

const launchConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.3, x: 0 },
  });
};

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  const text = params.get("text");
  const birthdayParam = params.get("birthday");

  if (text && text.length > 0) {
    name.value = decodeURI(text);

    if (birthdayParam !== null) {
      birthday.value = true;
      launchConfetti();
    } else {
      input.value.focus();
    }
  }

  useHead({
    title: name.value ? `${name.value} ⁕ ${hexName.value} ⁕ ` : "",
    titleTemplate: "%s ColorMeHex ⁕ Words are worth 16 million colors",
    meta: [
      {
        name: "og:image",
        content: `https://plchldr.co/i/1200x630?text=ColorMeHex&fc=${invertedHex.value.slice(
          1
        )}&bg=${hexName.value.slice(1)}`,
      },
      {
        name: "og:title",
        content: `${
          name.value.length ? `${name.value} - ${hexName.value}` : `ColorMeHex`
        }`,
      },
    ],
  });
});
</script>

<style>
@font-face {
  font-family: "Share Tech Mono";
  src: url(/src/assets/fonts/ShareTechMono-Regular.ttf);
  font-display: swap;
}

body {
  margin: 0;
}

a {
  color: inherit;
  font-weight: bold;
  word-break: break-all;
}

.hidden {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}

#app {
  --logo-size: 3rem;
  --font: "Share Tech Mono", Helvetica, Arial, sans-serif;
  --logo: url(/logo.svg);

  font-family: var(--font);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: var(--background);
  color: var(--color);
  min-height: 100vh;
  display: flex;
  flex-flow: column;
  transition: 0.3s cubic-bezier(0.79, 0.14, 0.15, 0.86);
}

.logo {
  align-self: flex-end;
  margin: 2rem 2rem 4rem;
  padding: calc(var(--logo-size) / 2);
  width: 0px;
  height: 0px;
  mask: var(--logo) no-repeat center center/contain;
  -webkit-mask: var(--logo) no-repeat center center/contain;
  background: var(--color);
}

form,
.results,
.colorCopy,
.actions {
  display: flex;
}

.colorCopy,
form {
  flex-flow: column;
}

form {
  padding: 0 2rem;
}

form label {
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

form input {
  margin: 0 0 2rem;
  padding: 1em;
  font-size: var(--font-size, 1.2rem);
  font-family: inherit;
  font-weight: bold;
  border: none;
  border-radius: 0.5em;
}

form input:disabled {
  color: inherit;
  background: inherit;
}

form output {
  margin: 1rem 0;
  font-size: 3rem;
  font-weight: bold;
  cursor: pointer;
}

form small {
  padding: 1em 0;
}

.results,
.actions {
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 3rem;
}

.notitification {
  flex: 100%;
}

.results svg {
  inline-size: 2rem;
  fill: currentColor;
}

.results a {
  margin-top: 1rem;
}

footer {
  display: flex;
  column-gap: 2rem;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: auto;
  padding: 2rem;
}

footer a {
  text-decoration: none;
}

@media screen and (min-width: 40rem) {
  form input {
    --font-size: 2rem;
  }
}

/* Transitions */
.show-enter-active {
  animation: show 0.5s;
}

.show-leave-active {
  animation: show 0.5s reverse;
}

@media (prefers-reduced-motion) {
  .show-enter-active,
  .show-leave-active {
    animation: none;
  }
}

@keyframes show {
  from {
    transform: translateY(3rem);
    opacity: 0;
  }
  to {
    transform: none;
    opacity: 1;
  }
}
</style>
