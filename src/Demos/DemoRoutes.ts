import { Routing } from "@singularsystems/neo-react";

import ModelsView from "./Views/ModelsView";
import UIElements from "./Views/UIElements";
import LayoutAndEditorsDemo from "./Views/LayoutAndEditors";
import FormsAndValidationDemo from "./Views/FormsAndValidation";
import ViewParamsDemo from "./Views/ViewParams";
import ViewBaseView from "./Views/ViewBaseView";
import NumericEditorDemo from "./Views/NumericEditor";
import DatePickerDemo from "./Views/DatePicker";
import ButtonsDemo from "./Views/Buttons";
import ModalDemo from "./Views/Modal";
import AlertsDemo from "./Views/Alerts";
import GridDemo from "./Views/Grid";
import TabsDemo from "./Views/Tabs";
import LoadingBarDemo from "./Views/LoadingBar";
import DropDownDemo from "./Views/DropDown";
import PagingDemo from "./Views/PagingView";
import FileDemo from "./Views/FileManagerView";
import { countries } from "./Models/Country";
import SliderView from "./Views/SliderView";
import ColorPickerView from "./Views/ColorPickerView";
import RBFormView from "./Views/NoLib/RBFormView";
import IconsView from "./Views/IconsView";
import GraphsView from "./Views/GraphsView";
import TooltipsView from "./Views/TooltipsView";

export const viewParametersRoute = {
  name: "View Parameters",
  path: "/demo/viewparams",
  component: ViewParamsDemo,
  allowAnonymous: true,
};

export const demoMenuItem: Routing.IMenuRoute = {
  name: "Demos",
  path: "/demo",
  component: UIElements,
  allowAnonymous: true,
  expanded: true,
  icon: "tablet-alt",
  children: [
    {
      name: "Layout & Editors",
      path: "/demo/layout",
      component: LayoutAndEditorsDemo,
      allowAnonymous: true,
    },
    {
      name: "Forms & Validation",
      path: "/demo/forms",
      component: FormsAndValidationDemo,
      allowAnonymous: true,
    },
    {
      name: "View Base & Navigation",
      path: "/demo/viewbase",
      component: ViewBaseView,
      allowAnonymous: true,
    },
    /*
            This demonstrates setting default view parameters, so that when you navigate to a page, 
            it will render with an initial state defined by the view parameter values.
        */
    {
      ...viewParametersRoute,
      children: countries.map(
        (c) =>
          new Routing.MenuRoute(
            viewParametersRoute /* Route specific options */,
            {
              name: c.name,
            } /* Specify menu specific properties like name and icon here. */,
            {
              country: c.countryCode,
            } /* Named parameter values (try change this to country2). */
          )
      ),
    },
    {
      name: "Models",
      path: "/demo/models",
      component: ModelsView,
      allowAnonymous: true,
    },
    {
      name: "Buttons",
      path: "/demo/buttons",
      component: ButtonsDemo,
      allowAnonymous: true,
    },
    {
      name: "Icons",
      path: "/demo/icons",
      component: IconsView,
      allowAnonymous: true,
    },
    {
      name: "Tooltips",
      path: "/demo/tooltips",
      component: TooltipsView,
      allowAnonymous: true,
    },
    {
      name: "Drop Down & Radio List",
      path: "/demo/dropdown",
      component: DropDownDemo,
      allowAnonymous: true,
    },
    {
      name: "Numeric Editor",
      path: "/demo/numericeditor",
      component: NumericEditorDemo,
      allowAnonymous: true,
    },
    {
      name: "Date Picker",
      path: "/demo/datepicker",
      component: DatePickerDemo,
      allowAnonymous: true,
    },
    {
      name: "Modals",
      path: "/demo/modal",
      component: ModalDemo,
      allowAnonymous: true,
    },
    {
      name: "Alerts & Toasts",
      path: "/demo/alerts",
      component: AlertsDemo,
      allowAnonymous: true,
    },
    {
      name: "Grid",
      path: "/demo/grid",
      component: GridDemo,
      allowAnonymous: true,
    },
    {
      name: "Paging",
      path: "/demo/paging",
      component: PagingDemo,
      allowAnonymous: true,
    },
    {
      name: "Tabs",
      path: "/demo/tabs",
      component: TabsDemo,
      allowAnonymous: true,
    },
    {
      name: "Loading & Progress",
      path: "/demo/loadingbar",
      component: LoadingBarDemo,
      allowAnonymous: true,
    },
    {
      name: "File Management",
      path: "/demo/files",
      component: FileDemo,
      allowAnonymous: true,
    },
    {
      name: "Graphs",
      path: "/demo/graphs",
      component: GraphsView,
      allowAnonymous: true,
    },
    {
      name: "Slider",
      path: "/demo/slider",
      component: SliderView,
      allowAnonymous: true,
    },
    {
      name: "Color Picker",
      path: "/demo/colorpicker",
      component: ColorPickerView,
      allowAnonymous: true,
    },
    {
      name: "NoLib",
      collapseSingle: false,
      allowAnonymous: true,
      children: [
        {
          name: "Form",
          path: "/demo/nolib/form",
          component: RBFormView,
          allowAnonymous: true
        }]
    }
  ],
};
