/* eslint-disable @typescript-eslint/no-explicit-any */
let debounceTimeout: ReturnType<typeof setTimeout> | null = null;
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  const debounced = (...args: Parameters<F>) => {
    if (debounceTimeout !== null) {
      clearTimeout(debounceTimeout);
      debounceTimeout = null;
    }
    debounceTimeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};

export const objToQuery = (obj) => {
  const hasValue = [];
  for (const key in obj) {
    if (obj[key]) {
      hasValue.push([key, obj[key]]);
    }
  }
  const query = new URLSearchParams(hasValue).toString();
  return query;
};

export const urlToObj = (url = document.location.href) => {
  const query = url.split("?")[1];
  const obj = Object.fromEntries(new URLSearchParams(query));
  return obj;
};

type Segment = {
  title?: string;
  header: { key: string; title: string }[];
  data: any[];
};

export function downloadCsv(segments: Segment[], filename = "export") {
  const a = document.createElement("a");

  const text = segments
    .map((segment) => {
      const { header = [], data = [], title = "" } = segment;

      const keys = header.map((s) => s.key);
      const segHeader = header.map((s) => s.title).join(",") + "\n";

      const segBody = data
        .map((item) => {
          return keys
            .map((k) => {
              let v = item[k] ?? "";
              if (typeof v === "boolean") v = v ? "Yes" : "No";
              v = v.toString().replaceAll(",", ";");
              return v;
            })
            .join(",");
        })
        .join("\n");

      return title + "\n " + segHeader + segBody;
    })
    .join("\n \n");

  a.href = "data:application/octet-stream, " + encodeURIComponent(text);
  a.download = `${filename}.csv`;
  a.click();
}

export function downloadCsvFromText(text, name) {
  const a = document.createElement("a");
  a.href = "data:application/octet-stream, " + encodeURIComponent(text);
  a.download = `${name}.csv`;
  a.click();
}

export function localDateTime(date) {
  if (!date) return "-";

  if (new Date(date).toString() === "Invalid Date") {
    return date;
  }

  return new Date(date).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

export function getTimeAgo(date: string | number | Date) {
  date = new Date(date).getTime();
  const currentTime = new Date().getTime();
  const timeDiff = Math.abs(currentTime - date);
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return seconds + " sec ago";
  } else if (minutes < 60) {
    return minutes + " min ago";
  } else if (hours < 24) {
    return hours + " hour ago";
  } else if (days < 7) {
    return days + " day ago";
  } else {
    return localDateTime(date); // Return the date in a different format if it's older than 7 days
  }
}
