import type { Schema, Attribute } from '@strapi/strapi';

export interface BradnSectionSect extends Schema.Component {
  collectionName: 'components_bradn_section_sects';
  info: {
    displayName: 'sect';
    icon: 'command';
  };
  attributes: {};
}

export interface ConfiguratorAdditionalOptions extends Schema.Component {
  collectionName: 'components_configurator_additional_options';
  info: {
    displayName: 'Additional Options';
    icon: 'attachment';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    incremental_price: Attribute.Float;
    name: Attribute.String & Attribute.Required;
  };
}

export interface ConfiguratorBodyColor extends Schema.Component {
  collectionName: 'components_configurator_body_colors';
  info: {
    displayName: 'Body_color';
    icon: 'car';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    btn_bg: Attribute.String;
    render_url: Attribute.String;
    incremental_price: Attribute.Float;
    additional_description: Attribute.String;
  };
}

export interface ConfiguratorContructorItem extends Schema.Component {
  collectionName: 'components_configurator_contructor_items';
  info: {
    displayName: 'contructor_item';
    icon: 'command';
    description: '';
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Zeekr 001 YOU '>;
    render_images: Attribute.Media & Attribute.Required;
    default_image: Attribute.Media & Attribute.Required;
    default_price: Attribute.Float;
    body_colors: Attribute.Component<'configurator.body-color', true>;
    wheels: Attribute.Component<'configurator.wheels', true>;
    tyres: Attribute.Component<'configurator.tyres', true>;
    additional_options: Attribute.Component<
      'configurator.additional-options',
      true
    >;
    render_interior_image: Attribute.Media;
    interior_colors: Attribute.Component<'configurator.interior', true>;
  };
}

export interface ConfiguratorInterior extends Schema.Component {
  collectionName: 'components_configurator_interiors';
  info: {
    displayName: 'Interior';
    icon: 'brush';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    render_url: Attribute.String;
    btn_bg: Attribute.String;
    additional_description: Attribute.String;
    incremental_price: Attribute.Float & Attribute.DefaultTo<0>;
    render_image: Attribute.Media;
    icon: Attribute.Media;
  };
}

export interface ConfiguratorTyres extends Schema.Component {
  collectionName: 'components_configurator_tyres';
  info: {
    displayName: 'Tyres';
    icon: 'store';
  };
  attributes: {
    name: Attribute.String;
    render_url: Attribute.String;
    icon: Attribute.Media;
    incremental_price: Attribute.Float;
    additional_description: Attribute.String;
  };
}

export interface ConfiguratorWheels extends Schema.Component {
  collectionName: 'components_configurator_wheels';
  info: {
    displayName: 'Wheels';
    icon: 'typhoon';
  };
  attributes: {
    name: Attribute.String;
    icon: Attribute.Media;
    incremental_price: Attribute.Float;
    additional_description: Attribute.String;
    render_url: Attribute.String;
  };
}

export interface HeadingForSectionHeading extends Schema.Component {
  collectionName: 'components_heading_for_section_headings';
  info: {
    displayName: 'heading';
    icon: 'bold';
    description: '';
  };
  attributes: {
    h1: Attribute.String;
    h2: Attribute.String;
    h3: Attribute.String;
    btn: Attribute.String;
  };
}

export interface LinksLink extends Schema.Component {
  collectionName: 'components_links_links';
  info: {
    displayName: 'Link';
    icon: 'attachment';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    href: Attribute.String & Attribute.Required;
  };
}

export interface LinksSocial extends Schema.Component {
  collectionName: 'components_links_socials';
  info: {
    displayName: 'social';
    icon: 'cast';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    href: Attribute.String & Attribute.Required;
    image: Attribute.Media & Attribute.Required;
  };
}

export interface PagePropertiesCarPreviewSlider extends Schema.Component {
  collectionName: 'components_page_properties_car_preview_sliders';
  info: {
    displayName: 'Car Preview Slider';
    icon: 'alien';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    logo: Attribute.Media;
    main_image: Attribute.Media;
    engine: Attribute.String;
    driving_range: Attribute.String;
    acceleration: Attribute.String;
    weight: Attribute.String;
    starting_price: Attribute.String;
  };
}

export interface PagePropertiesMainPageSlider extends Schema.Component {
  collectionName: 'components_page_properties_main_page_sliders';
  info: {
    displayName: 'Main Page Slider';
    icon: 'bell';
  };
  attributes: {
    items: Attribute.Component<'page-properties.car-preview-slider', true>;
  };
}

export interface PagePropertiesMetaTag extends Schema.Component {
  collectionName: 'components_page_properties_meta_tags';
  info: {
    displayName: 'MetaTag';
    icon: 'code';
  };
  attributes: {
    Name: Attribute.String;
    Content: Attribute.String;
  };
}

export interface PagePropertiesSection extends Schema.Component {
  collectionName: 'components_page_properties_sections';
  info: {
    displayName: 'section';
    icon: 'apps';
    description: '';
  };
  attributes: {
    heading: Attribute.Component<'heading-for-section.heading', true>;
    section_name: Attribute.String;
    stage_card: Attribute.Component<'stage-card.stage-card', true>;
  };
}

export interface PagePropertiesSeo extends Schema.Component {
  collectionName: 'components_page_properties_seos';
  info: {
    displayName: 'SEO';
    icon: 'filter';
    description: '';
  };
  attributes: {
    MetaTitle: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Electrohub | '>;
    MetaDescription: Attribute.String & Attribute.Required;
    MetaTag: Attribute.Component<'page-properties.meta-tag', true>;
    ogImage: Attribute.Media;
  };
}

export interface SaleTypeSaleType extends Schema.Component {
  collectionName: 'components_sale_type_sale_types';
  info: {
    displayName: 'sale_type';
    icon: 'crown';
    description: '';
  };
  attributes: {
    type: Attribute.String;
  };
}

export interface SectionAdvantage extends Schema.Component {
  collectionName: 'components_section_advantages';
  info: {
    displayName: 'advantage';
    icon: 'emotionHappy';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.String;
  };
}

export interface SectionButton extends Schema.Component {
  collectionName: 'components_section_buttons';
  info: {
    displayName: 'button';
    icon: 'connector';
    description: '';
  };
  attributes: {
    text: Attribute.String;
    icon: Attribute.Media;
  };
}

export interface SectionCarColor extends Schema.Component {
  collectionName: 'components_section_car_colors';
  info: {
    displayName: 'car-color';
    icon: 'crown';
  };
  attributes: {
    color: Attribute.String & Attribute.Required;
    image: Attribute.Media & Attribute.Required;
  };
}

export interface SectionZeekrExterior extends Schema.Component {
  collectionName: 'components_section_zeekr_exteriors';
  info: {
    displayName: 'zeekr_exterior';
    icon: 'cog';
  };
  attributes: {
    section_name: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'zeekr'>;
    logo: Attribute.Media & Attribute.Required;
    subtitle: Attribute.String &
      Attribute.DefaultTo<'\u044D\u043A\u0441\u0442\u0435\u0440\u044C\u0435\u0440'>;
    title: Attribute.String;
    description: Attribute.String;
    advantage: Attribute.Component<'section.advantage', true>;
    color: Attribute.Component<'section.car-color', true>;
    btn: Attribute.Component<'section.button', true>;
  };
}

export interface StageCardCard extends Schema.Component {
  collectionName: 'components_stage_card_cards';
  info: {
    displayName: 'card';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
  };
}

export interface StageCardStageCard extends Schema.Component {
  collectionName: 'components_stage_card_stage_cards';
  info: {
    displayName: 'stage_card';
    icon: 'code';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'bradn-section.sect': BradnSectionSect;
      'configurator.additional-options': ConfiguratorAdditionalOptions;
      'configurator.body-color': ConfiguratorBodyColor;
      'configurator.contructor-item': ConfiguratorContructorItem;
      'configurator.interior': ConfiguratorInterior;
      'configurator.tyres': ConfiguratorTyres;
      'configurator.wheels': ConfiguratorWheels;
      'heading-for-section.heading': HeadingForSectionHeading;
      'links.link': LinksLink;
      'links.social': LinksSocial;
      'page-properties.car-preview-slider': PagePropertiesCarPreviewSlider;
      'page-properties.main-page-slider': PagePropertiesMainPageSlider;
      'page-properties.meta-tag': PagePropertiesMetaTag;
      'page-properties.section': PagePropertiesSection;
      'page-properties.seo': PagePropertiesSeo;
      'sale-type.sale-type': SaleTypeSaleType;
      'section.advantage': SectionAdvantage;
      'section.button': SectionButton;
      'section.car-color': SectionCarColor;
      'section.zeekr-exterior': SectionZeekrExterior;
      'stage-card.card': StageCardCard;
      'stage-card.stage-card': StageCardStageCard;
    }
  }
}
