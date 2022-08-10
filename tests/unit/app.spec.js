import { shallowMount } from "@vue/test-utils";
import App from "@/App";

jest.useFakeTimers();

describe("App.vue", () => {
  let wrapper;

  beforeAll(() => {
    // Mock canvas
    HTMLCanvasElement.prototype.getContext = () => jest.fn();
  });

  beforeEach(() => {
    wrapper = shallowMount(App);
  });

  it("should render initially correctly", () => {
    expect(wrapper.vm.name).toBe("");
  });

  it("should render the hexName correctly", async () => {
    wrapper.setData({ name: "Cedric" });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.hexName).toHaveLength(7);
  });

  it("should be able to copy hexName", async () => {
    const mockedWriteText = jest.fn().mockResolvedValue(true);
    // Mock window navigation
    delete window.navigator;
    window.navigator = {
      clipboard: {
        writeText: mockedWriteText,
      },
    };

    wrapper.setData({ name: "lucas" });
    await wrapper.vm.$nextTick();
    wrapper.vm.copyHex();
    await wrapper.vm.$nextTick();
    expect(mockedWriteText).toHaveBeenCalledTimes(1);
    jest.runAllTimers();
    expect(wrapper.vm.message).toBe("");
  });

  it("should be able to clear message", () => {
    wrapper.setData({ message: "test" });
    wrapper.vm.clear();
    expect(wrapper.vm.message).toBe("");
  });

  it("should be able to load value from url query", () => {
    const string = "Test value";
    window.history.pushState({}, "Test page", `/?text=${string}`);
    const wrapper = shallowMount(App);
    expect(wrapper.vm.name).toBe(string);
  });

  it("should track outbound links", async () => {
    window.gtag = jest.fn();
    const outboundLink = wrapper.find(".twitter");
    await outboundLink.trigger("click");
    expect(window.gtag).toHaveBeenCalledTimes(1);
  });

  it("should load birthday mode from query and decode encoded values", () => {
    window.history.pushState(
      {},
      "Test page",
      `/?text=${encodeURIComponent("A&W")}&birthday`
    );
    const wrapper = shallowMount(App);
    expect(wrapper.vm.birthday).toBe(true);
    expect(wrapper.vm.name).toBe("A&W");
  });
});
