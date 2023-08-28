"use client";

import { features } from "@/utils/data";
import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const FeaturesList = () => {
	return (
		<>
			<VerticalTimeline lineColor="#fff">
				{features.map((feature) => (
					<VerticalTimelineElement
						key={feature.id}
						className="vertical-timeline-element"
						contentStyle={{
							background: "#0f0f0f",
							color: "#fff",
							boxShadow: "2px 0 0 0 rgba(255, 255, 255, 0.2)",
						}}
						contentArrowStyle={{
							borderRight: "8px solid  rgba(255, 255, 255, .2)",
						}}
						iconStyle={{ background: "#0f0f0f", color: "#fff" }}
						icon={feature.icon}
					>
						<h3 className="vertical-timeline-element-title font-bold text-lg">
							{feature.title}
						</h3>
						<p className="text-white/60">{feature.description}</p>
					</VerticalTimelineElement>
				))}
			</VerticalTimeline>
		</>
	);
};

export default FeaturesList;
