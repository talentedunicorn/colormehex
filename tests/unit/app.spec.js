import { shallowMount } from "@vue/test-utils";
import App from "@/App";

jest.useFakeTimers();

describe("App.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(App);
  });

  it("should render initially correctly", () => {
    expect(wrapper.vm.name).toBe("");
  });

  it("should render the hexName correctly", async () => {
    wrapper.setData({ name: "Cedric" });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.hexName).toBe("#AE398A");
  });

  it("should be able to copy link", async () => {
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
    expect(wrapper.vm.copied).toBe(false);
  });

  it("should be able to clear input", () => {
    wrapper.setData({ name: "test" });
    wrapper.vm.clear();
    expect(wrapper.vm.name).toBe("");
  });

  it("should be able to load value from url query", () => {
    const string = "Test value";
    window.history.pushState({}, "Test page", `/?text=${string}`);
    const wrapper = shallowMount(App);
    expect(wrapper.vm.name).toBe(string);
  });
});
