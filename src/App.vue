<template>
  <main id="app" :style="containerStyles">
    <h1 class="logo" @click="clear">
      <span class="hidden">ColorMeHex</span>
    </h1>
    <form @submit.prevent>
      <label>
        <span class="hidden">Type a name</span>
        <input
          placeholder="Type something here..."
          type="text"
          v-model="name"
          ref="input"
        />
      </label>

      <label v-if="name" v-show="hexName">
        Click to copy link
        <output @click="copyHex">{{ hexName }}</output>
        <small v-if="copied">{{ shareLink }}</small>
      </label>

      <span v-if="copied">Copied to clipboard</span>
    </form>

    <footer>
      <p>
        Made by
        <a @click="trackLink" href="https://talentedunicorn.com"
          >Talentedunicorn</a
        >
      </p>
      <a @click="trackLink" class="twitter" :href="twitterLink"
        >Share on Twitter</a
      >
    </footer>
  </main>
</template>

<script>
import invert from "invert-color";

export default {
  data() {
    return {
      name: "",
      copied: false,
    };
  },
  computed: {
    hexName() {
      let text = this.name.trim().toLowerCase();
      text = this.hashCode(text);
      text = this.intToRGB(text);
      return `#${text}`;
    },
    containerStyles() {
      return {
        "--background": this.hexName,
        "--color": this.invertedHex,
      };
    },
    invertedHex() {
      return invert(this.hexName);
    },
    twitterLink() {
      const description = "A fun toy that changes your text to colors";
      return `https://www.twitter.com/intent/tweet?url=${window.location.origin}&text=${description}`;
    },
    shareLink() {
      return encodeURI(`${window.location.origin}?text=${this.name}`);
    },
  },
  methods: {
    hashCode(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return hash;
    },
    intToRGB(i) {
      let c = (i & 0x00ffffff).toString(16).toUpperCase();
      return "00000".substring(0, 6 - c.length) + c;
    },
    copyHex() {
      navigator.clipboard.writeText(this.shareLink).then(() => {
        this.copied = true;
      });
    },
    clear() {
      this.name = "";
      this.copied = false;
    },
    trackLink(e) {
      window.gtag &&
        window.gtag("event", e.type, {
          event_category: "outbound link",
          event_label: e.target.href,
        });
    },
  },
  mounted() {
    this.$refs.input.focus();
    const params = new URLSearchParams(window.location.search);
    const text = params.get("text");
    if (text && text.length > 0) {
      this.name = decodeURI(text);
    }
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Share+Tech+Mono&display=swap");

body {
  margin: 0;
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
  mask: url("./assets/logo.svg") no-repeat center center/contain;
  background: var(--color);
}

form {
  padding: 0 2rem;

  input {
    margin: 0 0 2rem;
    padding: 0.5em;
    font-size: var(--font-size, 1.2rem);
    font-family: inherit;
    border: none;
    border-radius: 0.25em;

    @media screen and (min-width: 40rem) {
      --font-size: 2rem;
    }
  }

  label {
    display: flex;
    flex-flow: column;
  }

  output {
    margin: 1rem 0;
    font-size: 3rem;
    font-weight: bold;
  }

  small {
    padding: 1em 0;
  }
}

footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: auto;
  padding: 2rem;

  a {
    color: inherit;
    font-weight: bold;
    text-decoration: none;
  }
}
</style>
