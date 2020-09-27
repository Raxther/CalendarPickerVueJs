import { shallowMount } from "@vue/test-utils";
import Calendar from "@/components/Calendar.vue";
import moment from "moment"

const factory = (values = {}) => {
  const monthSelected = moment();
  return shallowMount(Calendar, {
    propsData: { monthSelected },
    data () {
      return {
        ...values
      }
    }
  })
}

describe("Calendar.vue", () => {

  it("renders props.month when passed", () => {
    const monthSelected = moment();
    const wrapper = factory();
    expect(wrapper.find('.calendar_year').text()).toMatch(monthSelected.year().toString());
  });

  it("renders blue circle when a day is selected", () => {
    const wrapper = factory({ daysSelected : [moment()] });

  expect(wrapper.find('.selected').exists()).toBeTruthy()}
  );

  it("renders multiple blue circle when days are selected", () => {
    const start = moment().startOf('month');
    const daysSelected = [start,  start.clone().add(1, 'days')];
    const wrapper = factory({ daysSelected });
  expect(wrapper.findAll('.selected').length).toBe(2)}
  );

  it("renders multiple blue circle dayweek clicked", async () => {
    let wrapper = factory();
    let button = wrapper.find('.calendar_day_header_title')
    expect(button.text()).toBe('DIM.')
    button.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('.selected').length).toBeGreaterThan(3)}
  );
});
